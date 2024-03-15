import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { IconButton } from '@mui/material';

import { useAppDispatch, useAppSelector } from '~/app/reduxHooks';
import { cartState, removeFromCart, updateCartTotal } from '~/features/cart/cartSlice';
import CartItem from '~/components/CartItem';
import { addToOrder, updateOrderTotal } from '~/features/order/orderSlice';
import CartOrderSection from '~/components/CartOrderSection';

const ShoppingCart = () => {
    const { cartItems, deliveryFeeCondition } = useAppSelector(cartState);
    const dispatch = useAppDispatch();
    const [allChecked, setAllChecked] = useState(false);

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
                        <Typography variant="body2" sx={{ flex: 4, display: 'flex', justifyContent: 'center' }}>
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
                <Box sx={{ marginBottom: 2, borderBottom: '1px solid #F4EDCC' }}>
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
                {/* 카트 관련 버튼 */}
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

                {/* 카트 주문 관련 섹션 */}
                {cartItems.length !== 0 && <CartOrderSection products={selectedProducts} />}
            </Box>
        </Container>
    );
};

export default ShoppingCart;
