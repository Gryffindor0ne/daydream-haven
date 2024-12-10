import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useAppDispatch, useAppSelector } from '~/app/reduxHooks';
import { ProductInfo } from '~/components/product/ProductsList';
import ProductSummaryBox from '~/components/product/ProductSummaryBox';
import BasicPopup from '~/components/layout/popup/BasicPopup';
import CartGuidancePopup from '~/components/layout/popup/CartGuidancePopup';
import DuplicateGuidancePopup from '~/components/layout/popup/DuplicateGuidancePopup';
import CapacityGrindSelector from '~/components/common/CapacityGrindSelector';
import { cartState, addToCart, updateCartTotal } from '~/features/cart/cartSlice';
import { addToOrder, updateDirectOrder, updateOrderTotal } from '~/features/order/orderSlice';
import { authState } from '~/features/auth/authSlice';
import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';
import { findPriceByCapacityAndPeriod } from '~/utils/utils';

export type OrderItemSummaryInfo = {
    id: string;
    name: string;
    price: number;
    capacity: string;
    grindSize: string;
    period?: string;
    quantity: number;
    thumbnail: string;
    type?: string;
};

const ProductSelectBox = ({ product }: { product: ProductInfo }) => {
    const [capacity, setCapacity] = useState<string>('');
    const [grindSize, setGrindSize] = useState<string>('');
    const [period, setPeriod] = useState<string>('');
    const [selectedProducts, setSelectedProducts] = useState<OrderItemSummaryInfo[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showCartGuidancePopup, setShowCartGuidancePopup] = useState<boolean>(false);
    const [showDuplicateGuidancePopup, setShowDuplicateGuidancePopup] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState('');

    const { currentPath, id } = useCurrentPathAndId();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { cartItems } = useAppSelector(cartState);
    const { isAuthenticated } = useAppSelector(authState);

    //capacity와 grindSize & period를 통합
    const handleOptionChange = (
        event: SelectChangeEvent<string>,
        setter: React.Dispatch<React.SetStateAction<string>>,
    ) => {
        setter(event.target.value);
    };

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    const handleCartGuidancePopupToggle = (open: boolean) => {
        setShowCartGuidancePopup(open);
    };

    const handleDuplicateGuidancePopupClose = () => {
        setShowDuplicateGuidancePopup(false);
    };

    const addProduct = useCallback(() => {
        let newProduct: OrderItemSummaryInfo;
        if (currentPath === 'subscription') {
            const newPrice = findPriceByCapacityAndPeriod(product, capacity, parseInt(period))!;
            newProduct = {
                id,
                name: product.name,
                price: newPrice,
                capacity: capacity,
                grindSize: grindSize,
                period: period,
                quantity: 1,
                thumbnail: product.detailImages[0],
            };
        } else {
            newProduct = {
                id,
                name: product.name,
                price: capacity === '200' ? product.price : product.price * 2,
                capacity: capacity,
                grindSize: grindSize,
                quantity: 1,
                thumbnail: product.detailImages[0],
            };
        }

        setSelectedProducts((prevProducts) => [...prevProducts, newProduct]);
    }, [currentPath, product, capacity, period, grindSize, id]);

    const handleDelete = (orderItemId: string) => {
        setSelectedProducts((prevProducts) => prevProducts.filter((product) => product.id !== orderItemId));
    };

    const handleQuantityChange = (orderItemId: string, newQuantity: number) => {
        if (currentPath === 'subscription') {
            setSelectedProducts((prevProducts) => {
                return prevProducts.map((item) => {
                    if (item.id === orderItemId && item.period) {
                        const newPrice = findPriceByCapacityAndPeriod(product, item.capacity, parseInt(item.period))!;
                        return { ...item, price: newPrice * newQuantity, quantity: newQuantity };
                    }
                    return item;
                });
            });
        } else {
            setSelectedProducts((prevProducts) => {
                return prevProducts.map((item) => {
                    if (item.id === orderItemId) {
                        const capacity = item.capacity;
                        const newPrice = capacity === '200' ? product.price : product.price * 2;
                        return { ...item, price: newPrice * newQuantity, quantity: newQuantity };
                    }
                    return item;
                });
            });
        }
    };

    const findDuplicateProducts = () => {
        const duplicates: OrderItemSummaryInfo[] = [];

        if (currentPath === 'subscription') {
            selectedProducts.forEach((selectedProduct) => {
                const foundProduct = cartItems.find((product) => {
                    return (
                        product.grindSize === selectedProduct.grindSize &&
                        product.capacity === selectedProduct.capacity &&
                        product.name === selectedProduct.name &&
                        product.period === selectedProduct.period
                    );
                });

                if (foundProduct) {
                    duplicates.push(foundProduct);
                }
            });
            return duplicates;
        } else {
            selectedProducts.forEach((selectedProduct) => {
                const foundProduct = cartItems.find((product) => {
                    return (
                        product.grindSize === selectedProduct.grindSize &&
                        product.capacity === selectedProduct.capacity &&
                        product.name === selectedProduct.name
                    );
                });

                if (foundProduct) {
                    duplicates.push(foundProduct);
                }
            });
            return duplicates;
        }
    };

    useEffect(() => {
        if (currentPath === 'subscription' && product && period) {
            const existingProduct = selectedProducts.find(
                (item) =>
                    item.grindSize === grindSize &&
                    item.capacity === capacity &&
                    item.name === product.name &&
                    item.period === period,
            );
            if (existingProduct) {
                setShowAlert(true);
                setAlertMessage('동일한 선택이 존재합니다.');
            } else {
                addProduct();
            }
            setCapacity('');
            setGrindSize('');
            setPeriod('');
        } else if (currentPath === 'shop' && grindSize && product) {
            const existingProduct = selectedProducts.find(
                (item) => item.grindSize === grindSize && item.name === product.name,
            );
            if (existingProduct) {
                setShowAlert(true);
                setAlertMessage('동일한 선택이 존재합니다.');
            } else {
                addProduct();
            }
            setCapacity('');
            setGrindSize('');
        }
    }, [addProduct, grindSize, selectedProducts, capacity, product, period, currentPath]);

    useEffect(() => {
        if (showCartGuidancePopup && selectedProducts.length === 0) {
            setShowAlert(true);
            setAlertMessage('옵션을 선택하여야 합니다.');
        } else {
            setShowAlert(false);
        }
    }, [showCartGuidancePopup, selectedProducts]);

    return (
        <Box sx={{ marginTop: 5 }}>
            {showAlert && <BasicPopup open={showAlert} onClose={handleAlertClose} message={alertMessage} />}

            {/* 용량과 분쇄도 & 기간 선택 컴포넌트 */}
            <CapacityGrindSelector
                productPrice={product?.price}
                capacity={capacity}
                setCapacity={setCapacity}
                grindSize={grindSize}
                setGrindSize={setGrindSize}
                period={period}
                setPeriod={setPeriod}
                handleOptionChange={handleOptionChange}
            />

            {/* <------------------------------------------------------------------------> */}

            {selectedProducts.map((product) => (
                <ProductSummaryBox
                    key={product.id}
                    product={product}
                    onDelete={() => handleDelete(product.id)}
                    onQuantityChange={(newQuantity) => handleQuantityChange(product.id, newQuantity)}
                />
            ))}
            {/* <------------------------------------------------------------------------> */}

            {showAlert && (
                <BasicPopup
                    open={showAlert}
                    onClose={handleAlertClose}
                    message={alertMessage}
                    cartPopupClose={handleCartGuidancePopupToggle}
                />
            )}

            {showCartGuidancePopup && selectedProducts.length !== 0 && (
                <CartGuidancePopup open={showCartGuidancePopup} onClose={handleCartGuidancePopupToggle} />
            )}

            {showDuplicateGuidancePopup && (
                <DuplicateGuidancePopup
                    open={showDuplicateGuidancePopup}
                    onClose={handleDuplicateGuidancePopupClose}
                    showCartGuidancePopup={handleCartGuidancePopupToggle}
                    products={selectedProducts}
                />
            )}

            <Stack direction="row" spacing={2} sx={{ marginTop: 5, height: 50 }}>
                <Button
                    onClick={() => {
                        if (findDuplicateProducts().length !== 0) {
                            setShowDuplicateGuidancePopup(true);
                        } else {
                            setShowCartGuidancePopup(true);
                            dispatch(addToCart(selectedProducts));
                            dispatch(updateCartTotal());
                        }
                    }}
                    variant="outlined"
                    sx={{
                        width: 215,
                        fontSize: 16,
                        '&:hover': {
                            color: '#B67352',
                            background: '#ffffff',
                        },
                    }}
                >
                    장바구니 담기
                </Button>
                <Button
                    onClick={() => {
                        if (selectedProducts.length !== 0) {
                            dispatch(addToOrder(selectedProducts));
                            dispatch(updateOrderTotal());
                            dispatch(updateDirectOrder(true));

                            isAuthenticated
                                ? navigate(`/order`)
                                : navigate(`/login`, { state: { redirectedFrom: '/order' } });
                        }
                        setShowCartGuidancePopup(true);
                    }}
                    variant="contained"
                    sx={{
                        width: 215,
                        fontSize: 16,
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
