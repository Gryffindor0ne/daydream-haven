import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '~/app/reduxHooks';
import { orderState } from '~/features/order/orderSlice';
import { formattedNumber } from '~/utils/utils';

const OrderPayment = () => {
    const { orderItems, deliveryFee, totalAmount } = useAppSelector(orderState);
    return (
        <Container maxWidth="lg">
            <Box sx={{ minHeight: '75vh', paddingTop: 12, marginTop: 10 }}>
                <Typography sx={{ fontSize: 25, marginBottom: 5 }}>결제하기</Typography>
                <Box>
                    {orderItems.map((item, idx) => (
                        <Typography key={idx}>
                            {item.name} {item.quantity} {item.price}
                        </Typography>
                    ))}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        py: 5,
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography
                            variant="subtitle1"
                            sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5, color: '#B99470' }}
                        >
                            주문금액
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5 }}
                        >
                            {formattedNumber(totalAmount)} 원
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography
                            variant="subtitle1"
                            sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5, color: '#B99470' }}
                        >
                            배송비
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{ display: 'flex', justifyContent: 'center', py: 2, px: 5 }}
                        >
                            {deliveryFee ? '3,000원' : '무료'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default OrderPayment;
