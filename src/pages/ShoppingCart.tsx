import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import { useAppDispatch, useAppSelector } from '~/app/reduxHooks';
import { cartState, removeFromCart, updateCartTotal } from '~/features/cart/cartSlice';
import CartItem from '~/components/CartItem';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { addToOrder, orderState, updateOrderTotal } from '~/features/order/orderSlice';
import { formattedNumber } from '~/utils/utils';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
    const { cartItems, deliveryFeeCondition } = useAppSelector(cartState);
    const { deliveryFee, subTotal, totalAmount } = useAppSelector(orderState);
    const dispatch = useAppDispatch();

    const [allChecked, setAllChecked] = useState(false);

    const navigate = useNavigate();

    //id값 모음
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    const handleAllItemChange = () => {
        if (selectedProducts.length === cartItems.length) {
            setSelectedProducts([]);
        } else {
            const allProductsIds = cartItems.map((cartItem) => cartItem.id);
            setSelectedProducts(allProductsIds);
        }
        setAllChecked(!allChecked);
    };

    const handleCheckBoxChange = (productId: string) => {
        setSelectedProducts((prevSelected) => {
            return prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId];
        });
    };

    const handleDeleteCartItems = () => {
        const changedCartItems = cartItems.filter((item) => !selectedProducts.includes(item.id));
        dispatch(removeFromCart(changedCartItems));
        setSelectedProducts([]);
    };

    useEffect(() => {
        const selectedCartItems = cartItems.filter((item) => selectedProducts.includes(item.id));
        dispatch(addToOrder(selectedCartItems));
        dispatch(updateOrderTotal());
        dispatch(updateCartTotal());
    }, [selectedProducts, cartItems, dispatch]);

    return (
        <Container maxWidth="lg">
            <Box sx={{ minHeight: '75vh', paddingTop: 12, marginTop: 10, marginBottom: 5 }}>
                <Typography sx={{ fontSize: 25, marginBottom: 5 }}>장바구니</Typography>

                <Box sx={{ display: 'flex', py: 1, background: '#F5EEE6' }}>
                    <Checkbox
                        checked={selectedProducts.length === cartItems.length}
                        onChange={handleAllItemChange}
                        size="small"
                        color="default"
                        sx={{
                            '&:hover': { bgcolor: 'transparent' },
                        }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Typography variant="body2" sx={{ flex: 5, display: 'flex', justifyContent: 'center' }}>
                            상품정보
                        </Typography>
                        <Typography variant="body2" sx={{ flex: 1.5, display: 'flex', justifyContent: 'center' }}>
                            수량
                        </Typography>
                        <Typography variant="body2" sx={{ flex: 1.5, display: 'flex', justifyContent: 'center' }}>
                            금액
                        </Typography>
                        <Typography variant="body2" sx={{ flex: 1.5, display: 'flex', justifyContent: 'center' }}>
                            배송비
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    {cartItems.length !== 0 ? (
                        cartItems.map((cartItem) => (
                            <CartItem
                                item={cartItem}
                                deliveryFeeCondition={deliveryFeeCondition}
                                key={cartItem.id}
                                checked={selectedProducts.includes(cartItem.id)}
                                handler={() => handleCheckBoxChange(cartItem.id)}
                            />
                        ))
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 15 }}>
                            <IconButton sx={{ width: 70, height: 70 }}>
                                <ShoppingCartOutlinedIcon sx={{ width: 50, height: 50 }} />
                            </IconButton>

                            <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                                장바구니에 상품이 없습니다.
                            </Typography>
                        </Box>
                    )}
                </Box>

                {cartItems.length !== 0 && (
                    <Button
                        onClick={handleDeleteCartItems}
                        variant="outlined"
                        sx={{
                            width: 130,
                            fontSize: 14,
                            '&:hover': {
                                color: '#B67352',
                                background: '#ffffff',
                            },
                        }}
                    >
                        선택상품 삭제
                    </Button>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', py: 7 }}>
                    <Box sx={{ borderBottom: '1px solid gray' }}>
                        <Typography
                            variant="body2"
                            sx={{ display: 'flex', py: 2 }}
                        >{`총 주문 수량 ${selectedProducts.length} 개`}</Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            py: 5,
                            borderBottom: '1px solid gray',
                        }}
                    >
                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5 }}
                            >
                                {selectedProducts.length !== 0 ? formattedNumber(subTotal) : 0} 원
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5, color: '#B99470' }}
                            >
                                상품금액
                            </Typography>
                        </Box>

                        <Typography
                            variant="subtitle1"
                            sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5 }}
                        >
                            <AddOutlinedIcon />
                        </Typography>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5 }}
                            >
                                {selectedProducts.length !== 0 ? (deliveryFee ? '3,000원' : '무료') : '0 원'}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5, color: '#B99470' }}
                            >
                                배송비
                            </Typography>
                        </Box>
                        <Typography
                            variant="subtitle1"
                            sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5 }}
                        >
                            <DragHandleIcon />
                        </Typography>

                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5 }}
                            >
                                {selectedProducts.length !== 0 ? formattedNumber(totalAmount) : 0} 원
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5, color: '#B99470' }}
                            >
                                총 주문금액
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 5,
                    }}
                >
                    {selectedProducts.length !== 0 && (
                        <Button
                            onClick={() => navigate(`/order`)}
                            variant="outlined"
                            sx={{
                                width: 200,
                                height: 50,
                                fontSize: 16,
                                color: '#ffffff',
                                background: '#B67352',

                                '&:hover': {
                                    color: '#ffffff',
                                    background: '#B67352',
                                },
                            }}
                        >
                            주문하기
                        </Button>
                    )}
                    <Box sx={{ py: 2 }}>
                        <Button
                            onClick={() => navigate(`/shop`)}
                            variant="outlined"
                            sx={{
                                width: 200,
                                height: 50,
                                fontSize: 16,
                                '&:hover': {
                                    color: '#B67352',
                                    background: '#ffffff',
                                },
                            }}
                        >
                            계속 쇼핑하기
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default ShoppingCart;
