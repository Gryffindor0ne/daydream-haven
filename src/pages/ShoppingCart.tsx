import { useEffect, useState } from 'react';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, Button, Checkbox, Container, IconButton, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '~/app/reduxHooks';
import { cartState, removeFromCart, updateCartTotal } from '~/features/cart/cartSlice';
import { addToOrder, updateOrderTotal } from '~/features/order/orderSlice';
import CartItem from '~/components/cart/CartItem';
import CartOrderSection from '~/components/cart/CartOrderSection';
import useScrollToTop from '~/hooks/useScrollToTop';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';

const ShoppingCart: React.FC = () => {
    const { cartItems, deliveryFeeCondition } = useAppSelector(cartState);
    const dispatch = useAppDispatch();
    const { isMobile } = useResponsiveLayout();
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    useScrollToTop();

    const isAllSelected = selectedProducts.length === cartItems.length;
    const hasItems = cartItems.length !== 0;

    const handleAllItemChange = () => {
        const newSelected = isAllSelected ? [] : cartItems.map((item) => item.id);
        setSelectedProducts(newSelected);
    };

    const handleCheckBoxChange = (productId: string) => {
        setSelectedProducts((prev) =>
            prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
        );
    };

    const handleDeleteCartItems = () => {
        const remainingItems = cartItems.filter((item) => !selectedProducts.includes(item.id));
        dispatch(removeFromCart(remainingItems));
        setSelectedProducts([]);
    };

    useEffect(() => {
        const selectedItems = cartItems.filter((item) => selectedProducts.includes(item.id));
        dispatch(addToOrder(selectedItems));
        dispatch(updateOrderTotal());
        dispatch(updateCartTotal());
    }, [selectedProducts, cartItems, dispatch]);

    const CartHeader = () =>
        isMobile ? (
            <Box sx={{ display: 'flex', py: 0.5, borderBottom: '1px solid #F4EDCC' }} />
        ) : (
            <Box sx={{ display: 'flex', py: 1, background: '#F5EEE6' }}>
                <Checkbox
                    checked={isAllSelected}
                    onChange={handleAllItemChange}
                    size="small"
                    color="default"
                    sx={{ '&:hover': { bgcolor: 'transparent' } }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Typography sx={{ flex: 5.5, display: 'flex', justifyContent: 'center' }}>상품정보</Typography>
                    <Typography sx={{ flex: 3, display: 'flex', justifyContent: 'center' }}>수량</Typography>
                    <Typography sx={{ flex: 2.5, display: 'flex', justifyContent: 'center' }}>금액</Typography>
                    <Typography sx={{ flex: 3, display: 'flex', justifyContent: 'center' }}>배송비</Typography>
                </Box>
            </Box>
        );

    const EmptyCart = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 15 }}>
            <IconButton sx={{ width: 70, height: 70 }}>
                <ShoppingCartOutlinedIcon sx={{ width: 50, height: 50 }} />
            </IconButton>
            <Typography sx={{ display: 'flex', justifyContent: 'center', py: 2, fontSize: 20 }}>
                장바구니에 상품이 없습니다.
            </Typography>
        </Box>
    );

    const CartActions = () => {
        const buttonStyles = {
            width: isMobile ? 110 : 130,
            height: isMobile ? 35 : 40,
            fontSize: isMobile ? 13 : 15,
            '&:hover': {
                color: '#B67352',
                background: '#ffffff',
            },
        };

        return (
            <Box sx={{ display: 'flex', justifyContent: isMobile ? 'space-evenly' : 'flex-start' }}>
                <Button onClick={handleAllItemChange} variant="outlined" sx={{ ...buttonStyles, mr: isMobile ? 0 : 2 }}>
                    전체선택
                </Button>
                <Button onClick={handleDeleteCartItems} variant="outlined" sx={buttonStyles}>
                    선택상품 삭제
                </Button>
            </Box>
        );
    };

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    minHeight: '80vh',
                    pt: 12,
                    mt: isMobile ? 2 : 10,
                    mb: 5,
                }}
            >
                <Typography
                    sx={{
                        fontSize: isMobile ? 20 : 25,
                        mb: isMobile ? 2 : 5,
                    }}
                >
                    장바구니
                </Typography>

                <CartHeader />

                <Box sx={{ mb: 2, borderBottom: '1px solid #F4EDCC' }}>
                    {hasItems ? (
                        cartItems.map((cartItem) => (
                            <CartItem
                                key={cartItem.id}
                                item={cartItem}
                                deliveryFeeCondition={deliveryFeeCondition}
                                checked={selectedProducts.includes(cartItem.id)}
                                handler={() => handleCheckBoxChange(cartItem.id)}
                            />
                        ))
                    ) : (
                        <EmptyCart />
                    )}
                </Box>

                {hasItems && (
                    <>
                        <CartActions />
                        <CartOrderSection products={selectedProducts} />
                    </>
                )}
            </Box>
        </Container>
    );
};

export default ShoppingCart;
