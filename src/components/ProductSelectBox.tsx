import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useCallback, useEffect, useState } from 'react';
import { ProductInfo } from '~/components/ProductsList';
import ProductSummaryBox from '~/components/ProductSummaryBox';
import { formattedNumber } from '~/utils/utils';
import BasicAlert from '~/components/BasicAlert';
import { useNavigate } from 'react-router-dom';
import CartGuidancePopup from '~/components/CartGuidancePopup';

export type OrderProductSummaryInfo = {
    id: number;
    name: string;
    price: number;
    weight: string;
    grindSize: string;
    quantity: number;
};

const ProductSelectBox = ({ product }: { product: ProductInfo }) => {
    const [weight, setWeight] = useState<string>('');
    const [grindSize, setGrindSize] = useState<string>('');
    const [selectedProducts, setSelectedProducts] = useState<OrderProductSummaryInfo[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showCartGuidancePopup, setShowCartGuidancePopup] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();

    const grindSizeGroups = [
        '',
        '갈지않음(홀빈)',
        '에스프레소',
        '모카포트',
        '에어로프레스',
        '프렌치프레스',
        '핸드드립',
        '커피메이커',
        '더치커피',
    ];

    const handleWeightChange = (event: SelectChangeEvent) => {
        setWeight(event.target.value);
    };
    const handleGrindSizeChange = (event: SelectChangeEvent) => {
        setGrindSize(event.target.value);
    };

    const handleSelectClick = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleAlertClose = () => {
        setShowAlert(false);
    };
    const handleCartGuidancePopupClose = () => {
        setShowCartGuidancePopup(false);
    };

    const addProduct = useCallback(() => {
        const newProduct: OrderProductSummaryInfo = {
            id: selectedProducts.length + 1,
            name: product.name,
            price: parseInt(weight) === 200 ? product.price : product.price * 2,
            weight: weight,
            grindSize: grindSize,
            quantity: 1,
        };

        setSelectedProducts((prevProducts) => [...prevProducts, newProduct]);
    }, [selectedProducts, product, weight, grindSize]);

    const handleDelete = (productId: number) => {
        setSelectedProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    };

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        setSelectedProducts((prevProducts) => {
            return prevProducts.map((item) => {
                if (item.id === productId) {
                    const weight = parseInt(item.weight);
                    const newPrice = weight === 200 ? product.price : product.price * 2;
                    return { ...item, price: newPrice * newQuantity, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    useEffect(() => {
        if (grindSize && !isOpen) {
            const existingProduct = selectedProducts.find(
                (item) => item.grindSize === grindSize && item.weight === weight,
            );
            if (existingProduct) {
                setShowAlert(true);
                setAlertMessage('동일한 선택이 존재합니다.');
            } else {
                addProduct();
            }
            setWeight('');
            setGrindSize('');
        }
    }, [addProduct, grindSize, isOpen, selectedProducts, weight]);

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
            {showAlert && <BasicAlert open={showAlert} onClose={handleAlertClose} message={alertMessage} />}
            <FormControl sx={{ marginY: 2, maxWidth: 450, width: '100%' }}>
                <Typography
                    sx={{
                        width: 120,
                        fontSize: 13,
                        marginY: 0.5,
                        paddingLeft: 1,
                    }}
                >
                    용량
                </Typography>
                <Select value={weight} displayEmpty onChange={handleWeightChange} sx={{ fontSize: 12 }}>
                    <MenuItem value="" disabled sx={{ fontSize: 12 }}>
                        <em>용량을 선택하세요.</em>
                    </MenuItem>
                    <MenuItem value={200} sx={{ fontSize: 12 }}>
                        200g
                    </MenuItem>
                    <MenuItem value={500} sx={{ fontSize: 12 }}>
                        500g {`(+${formattedNumber(product?.price as number)}원)`}
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ marginY: 2, maxWidth: 450, width: '100%' }}>
                <Typography
                    sx={{
                        width: 120,
                        fontSize: 13,
                        marginY: 0.5,
                        paddingLeft: 1,
                    }}
                >
                    분쇄도
                </Typography>
                {weight ? (
                    <Select value={grindSize} displayEmpty onChange={handleGrindSizeChange} sx={{ fontSize: 12 }}>
                        <MenuItem value="" disabled sx={{ fontSize: 12 }}>
                            <em>분쇄도를 선택하세요</em>
                        </MenuItem>

                        {grindSizeGroups.map((grindSize, idx) => (
                            <MenuItem key={idx} value={idx} sx={{ fontSize: 12 }}>
                                {grindSize}
                            </MenuItem>
                        ))}
                    </Select>
                ) : (
                    <Select
                        value={grindSize}
                        onClose={handleClose}
                        onOpen={handleSelectClick}
                        displayEmpty={!isOpen}
                        onChange={handleGrindSizeChange}
                        sx={{ fontSize: 12 }}
                    >
                        <MenuItem value="" disabled sx={{ fontSize: 12 }}>
                            <em>{isOpen ? '용량을 먼저 선택해주세요.' : '분쇄도를 선택하세요.'}</em>
                        </MenuItem>
                    </Select>
                )}
            </FormControl>
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
                <BasicAlert
                    open={showAlert}
                    onClose={handleAlertClose}
                    message={alertMessage}
                    cartPopupClose={handleCartGuidancePopupClose}
                />
            )}

            {showCartGuidancePopup && selectedProducts.length !== 0 && (
                <CartGuidancePopup open={showCartGuidancePopup} onClose={handleCartGuidancePopupClose} />
            )}

            <Stack direction="row" spacing={2} sx={{ marginTop: 5, height: 50 }}>
                <Button
                    onClick={() => setShowCartGuidancePopup(true)}
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
                            navigate(`/cart`);
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
