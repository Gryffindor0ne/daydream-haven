import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import { useAppSelector } from '~/app/reduxHooks';
import { orderState } from '~/features/order/orderSlice';
import { authState } from '~/features/auth/authSlice';
import { formattedNumber } from '~/utils/utils';

const CartOrderSection = ({ products }: { products: string[] }) => {
    const navigate = useNavigate();
    const { deliveryFee, subTotal, totalAmount } = useAppSelector(orderState);
    const { isAuthenticated } = useAppSelector(authState);

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', py: 7 }}>
                <Box sx={{ borderBottom: '1px solid gray' }}>
                    <Typography
                        variant="body2"
                        sx={{ display: 'flex', py: 2 }}
                    >{`총 주문 수량 ${products.length} 개`}</Typography>
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
                            {products.length !== 0 ? formattedNumber(subTotal) : 0} 원
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5, color: '#B99470' }}
                        >
                            상품금액
                        </Typography>
                    </Box>

                    <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5 }}>
                        <AddOutlinedIcon />
                    </Typography>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5 }}
                        >
                            {products.length !== 0 ? (deliveryFee ? '3,000원' : '무료') : '0 원'}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5, color: '#B99470' }}
                        >
                            배송비
                        </Typography>
                    </Box>
                    <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5 }}>
                        <DragHandleIcon />
                    </Typography>

                    <Box>
                        <Typography
                            variant="subtitle1"
                            sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5 }}
                        >
                            {products.length !== 0 ? formattedNumber(totalAmount) : 0} 원
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
                {products.length !== 0 && (
                    <Button
                        onClick={() => {
                            isAuthenticated ? navigate(`/order`) : navigate(`/login?redirectedFrom=order`);
                        }}
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
        </>
    );
};

export default CartOrderSection;
