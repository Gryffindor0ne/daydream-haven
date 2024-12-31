import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { Box, Button, Stack } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { useAppDispatch, useAppSelector } from '~/app/reduxHooks';

import ProductSummaryBox from '~/components/product/ProductSummaryBox';
import BasicPopup from '~/components/layout/popup/BasicPopup';
import CartGuidancePopup from '~/components/layout/popup/CartGuidancePopup';
import DuplicateGuidancePopup from '~/components/layout/popup/DuplicateGuidancePopup';
import CapacityGrindSelector from '~/components/common/CapacityGrindSelector';
import { cartState, addToCart, updateCartTotal } from '~/features/cart/cartSlice';
import { addToOrder, updateDirectOrder, updateOrderTotal } from '~/features/order/orderSlice';
import { authState } from '~/features/auth/authSlice';
import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { ProductInfo } from '~/types/product';
import { OrderItemSummaryInfo } from '~/types/order';
import { findPriceByCapacityAndPeriod } from '~/utils/product';

interface ProductSelectBoxProps {
    product: ProductInfo;
}

const ProductSelectBox: React.FC<ProductSelectBoxProps> = ({ product }) => {
    // State management
    const [capacity, setCapacity] = useState('');
    const [grindSize, setGrindSize] = useState('');
    const [period, setPeriod] = useState('');
    const [selectedProducts, setSelectedProducts] = useState<OrderItemSummaryInfo[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showCartGuidance, setShowCartGuidance] = useState(false);
    const [showDuplicateGuidance, setShowDuplicateGuidance] = useState(false);

    // Hooks
    const { currentPath, id } = useCurrentPathAndId();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { cartItems } = useAppSelector(cartState);
    const { isAuthenticated } = useAppSelector(authState);
    const { isMobile } = useResponsiveLayout();

    // Alert handlers
    const handleAlertClose = useCallback(() => {
        setShowAlert(false);
        setAlertMessage('');
        setCapacity('');
        setGrindSize('');
        setPeriod('');
    }, []);

    const handleCartGuidanceToggle = useCallback((open: boolean) => {
        setShowCartGuidance(open);
    }, []);

    const handleDuplicateGuidanceClose = useCallback(() => {
        setShowDuplicateGuidance(false);
    }, []);

    const showAlertMessage = useCallback((message: string) => {
        setAlertMessage(message);
        setShowAlert(true);
    }, []);

    // Product handlers
    const calculateProductPrice = useCallback(
        (selectedCapacity: string, quantity: number) => {
            const basePrice = product.price;
            return selectedCapacity === '200' ? basePrice * quantity : basePrice * 2 * quantity;
        },
        [product.price],
    );

    const handleOptionChange = (
        event: SelectChangeEvent<string>,
        setter: React.Dispatch<React.SetStateAction<string>>,
    ) => {
        setter(event.target.value);
    };

    const createNewProduct = useCallback((): OrderItemSummaryInfo => {
        const baseProduct = {
            id: nanoid(), // 리스트 아이템을 위한 고유 ID 생성
            productId: id, // 원래 제품 ID는 productId로 저장
            name: product.name,
            capacity,
            grindSize,
            quantity: 1,
            thumbnail: product.thumbnail,
        };

        if (currentPath === 'subscription') {
            return {
                ...baseProduct,
                price: findPriceByCapacityAndPeriod(product, capacity, parseInt(period))!,
                period,
            };
        }

        return {
            ...baseProduct,
            price: calculateProductPrice(capacity, 1),
        };
    }, [currentPath, product, capacity, grindSize, period, id, calculateProductPrice]);

    const handleProductManagement = useMemo(
        () => ({
            add: () => {
                const newProduct = createNewProduct();
                setSelectedProducts((prev) => [...prev, newProduct]);
                setCapacity('');
                setGrindSize('');
                setPeriod('');
            },

            delete: (productId: string) => {
                setSelectedProducts((prev) => prev.filter((product) => product.id !== productId));
            },

            updateQuantity: (productId: string, newQuantity: number) => {
                setSelectedProducts((prev) =>
                    prev.map((item) => {
                        if (item.id !== productId) return item;

                        const newPrice =
                            currentPath === 'subscription'
                                ? findPriceByCapacityAndPeriod(product, item.capacity, parseInt(item.period!))! *
                                  newQuantity
                                : calculateProductPrice(item.capacity, newQuantity);

                        return { ...item, price: newPrice, quantity: newQuantity };
                    }),
                );
            },
        }),
        [createNewProduct, currentPath, product, calculateProductPrice],
    );

    const checkDuplicateProducts = useCallback(() => {
        return selectedProducts.filter((selectedProduct) =>
            cartItems.some((cartItem) => {
                const baseMatch =
                    cartItem.grindSize === selectedProduct.grindSize &&
                    cartItem.capacity === selectedProduct.capacity &&
                    cartItem.name === selectedProduct.name;

                return currentPath === 'subscription'
                    ? baseMatch && cartItem.period === selectedProduct.period
                    : baseMatch;
            }),
        );
    }, [cartItems, currentPath, selectedProducts]);

    const handlePurchase = useCallback(() => {
        if (selectedProducts.length === 0) {
            showAlertMessage('옵션을 선택하여야 합니다.');
            return;
        }

        dispatch(addToOrder(selectedProducts));
        dispatch(updateOrderTotal());
        dispatch(updateDirectOrder(true));

        isAuthenticated ? navigate('/order') : navigate('/login', { state: { redirectedFrom: '/order' } });
    }, [selectedProducts, dispatch, isAuthenticated, navigate, showAlertMessage]);

    const handleAddToCart = useCallback(() => {
        const duplicates = checkDuplicateProducts();

        if (duplicates.length > 0) {
            setShowDuplicateGuidance(true);
            return;
        }

        dispatch(addToCart(selectedProducts));
        dispatch(updateCartTotal());
        setShowCartGuidance(true);
    }, [checkDuplicateProducts, dispatch, selectedProducts]);

    // Effects
    useEffect(() => {
        if (!grindSize) return;

        const isSubscription = currentPath === 'subscription';
        const isDuplicate = selectedProducts.some((item) => {
            const baseMatch = item.grindSize === grindSize && item.name === product.name && item.capacity === capacity;

            return isSubscription ? baseMatch && item.period === period : baseMatch;
        });

        if (isDuplicate) {
            showAlertMessage('동일한 선택이 존재합니다.');
            return;
        }

        if (!isSubscription || (isSubscription && period)) {
            handleProductManagement.add();
        }
    }, [
        grindSize,
        capacity,
        period,
        currentPath,
        product,
        selectedProducts,
        showAlertMessage,
        handleProductManagement.add,
        handleProductManagement,
    ]);

    return (
        <Box sx={{ mt: isMobile ? 0 : 2 }}>
            {/* Alerts and Popups */}
            {showAlert && (
                <BasicPopup
                    open={showAlert}
                    onClose={handleAlertClose}
                    message={alertMessage}
                    cartPopupClose={handleCartGuidanceToggle}
                />
            )}

            {showCartGuidance && selectedProducts.length > 0 && (
                <CartGuidancePopup open={showCartGuidance} onClose={handleCartGuidanceToggle} />
            )}

            {showDuplicateGuidance && (
                <DuplicateGuidancePopup
                    open={showDuplicateGuidance}
                    onClose={handleDuplicateGuidanceClose}
                    showCartGuidancePopup={handleCartGuidanceToggle}
                    products={selectedProducts}
                />
            )}

            {/* Product Selection */}
            <CapacityGrindSelector
                productPrice={product?.price}
                capacity={capacity}
                grindSize={grindSize}
                period={period}
                setCapacity={setCapacity}
                setGrindSize={setGrindSize}
                setPeriod={setPeriod}
                handleOptionChange={handleOptionChange}
            />

            {/* Selected Products */}
            {selectedProducts.map((product) => (
                <ProductSummaryBox
                    key={product.id}
                    product={product}
                    onDelete={() => handleProductManagement.delete(product.id)}
                    onQuantityChange={(quantity) => handleProductManagement.updateQuantity(product.id, quantity)}
                />
            ))}

            {/* Action Buttons */}
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    mt: 5,
                    width: isMobile ? '100%' : 450,
                    height: isMobile ? 40 : 50,
                    justifyContent: 'space-evenly',
                }}
            >
                <Button
                    onClick={handleAddToCart}
                    variant="outlined"
                    sx={{
                        width: isMobile ? 200 : 215,
                        fontSize: isMobile ? 15 : 20,
                        '&:hover': {
                            color: '#B67352',
                            background: '#ffffff',
                        },
                    }}
                >
                    장바구니 담기
                </Button>
                <Button
                    onClick={handlePurchase}
                    variant="contained"
                    sx={{
                        width: isMobile ? 200 : 215,
                        fontSize: isMobile ? 15 : 20,
                        '&:hover': {
                            color: '#ffffff',
                            background: '#B67352',
                        },
                    }}
                >
                    바로 구매하기
                </Button>
            </Stack>
        </Box>
    );
};

export default ProductSelectBox;
