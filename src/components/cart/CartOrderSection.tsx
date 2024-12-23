import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import { useAppDispatch, useAppSelector } from '~/app/reduxHooks';
import { orderState, updateDirectOrder } from '~/features/order/orderSlice';
import { authState } from '~/features/auth/authSlice';

import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { formatNumber } from '~/utils/number';

const CartOrderSection = ({ products }: { products: string[] }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { deliveryFee, subTotal, totalAmount } = useAppSelector(orderState);
    const { isAuthenticated } = useAppSelector(authState);

    const { isMobile } = useResponsiveLayout();

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', py: isMobile ? 3 : 7 }}>
                <Box sx={{ borderBottom: isMobile ? '' : '1px solid gray' }}>
                    <Typography
                        sx={{ display: 'flex', py: 2, pl: 1, fontSize: isMobile ? 15 : 18 }}
                    >{`총 주문 수량 ${products.length} 개`}</Typography>
                </Box>

                {isMobile ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            py: 1,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                p: 1,
                                bgcolor: '#F5EEE6',
                            }}
                        >
                            <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: 15 }}>
                                총 주문금액
                            </Typography>
                            <Typography
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: isMobile ? 15 : 18,
                                    fontWeight: 'bold',
                                }}
                            >
                                {products.length !== 0 ? formatNumber(totalAmount) : 0} 원
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                p: 1,
                            }}
                        >
                            <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: 15 }}>
                                상품금액
                            </Typography>
                            <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: 15 }}>
                                {products.length !== 0 ? formatNumber(subTotal) : 0} 원
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                p: 1,
                            }}
                        >
                            <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: 15 }}>
                                배송비
                            </Typography>
                            <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: 15 }}>
                                {products.length !== 0 ? (deliveryFee ? '3,000원' : '무료') : '0 원'}
                            </Typography>
                        </Box>
                    </Box>
                ) : (
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
                            <Typography sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5, fontSize: 20 }}>
                                {products.length !== 0 ? formatNumber(subTotal) : 0} 원
                            </Typography>
                            <Typography
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    py: 2,
                                    px: 5,
                                    color: '#B99470',
                                    fontSize: 18,
                                }}
                            >
                                상품금액
                            </Typography>
                        </Box>

                        <Typography sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5, fontSize: 20 }}>
                            <AddOutlinedIcon />
                        </Typography>
                        <Box>
                            <Typography sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5, fontSize: 20 }}>
                                {products.length !== 0 ? (deliveryFee ? '3,000원' : '무료') : '0 원'}
                            </Typography>
                            <Typography
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    py: 2,
                                    px: 5,
                                    color: '#B99470',
                                    fontSize: 18,
                                }}
                            >
                                배송비
                            </Typography>
                        </Box>
                        <Typography sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5, fontSize: 20 }}>
                            <DragHandleIcon />
                        </Typography>

                        <Box>
                            <Typography sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5, fontSize: 20 }}>
                                {products.length !== 0 ? formatNumber(totalAmount) : 0} 원
                            </Typography>
                            <Typography
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    py: 2,
                                    px: 5,
                                    color: '#B99470',
                                    fontSize: 18,
                                }}
                            >
                                총 주문금액
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: isMobile ? 0 : 5,
                }}
            >
                {products.length !== 0 && (
                    <Button
                        onClick={() => {
                            dispatch(updateDirectOrder(false));
                            if (isAuthenticated) {
                                navigate('/order');
                            } else {
                                navigate('/login', { state: { redirectedFrom: '/order' } });
                            }
                        }}
                        variant="outlined"
                        sx={{
                            width: isMobile ? 150 : 250,
                            height: isMobile ? 40 : 50,
                            fontSize: isMobile ? 14 : 18,
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
                            width: isMobile ? 150 : 250,
                            height: isMobile ? 40 : 50,
                            fontSize: isMobile ? 14 : 18,
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
        </>
    );
};

export default CartOrderSection;
