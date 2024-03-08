import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '~/app/reduxHooks';
import { selectPurchase } from '~/features/purchase/purchaseSlice';

const OrderPayment = () => {
    const { selectedProducts } = useAppSelector(selectPurchase);
    return (
        <Container maxWidth="lg">
            <Box sx={{ minHeight: '75vh', paddingTop: 12, marginTop: 10 }}>
                <Typography>OrderPayment</Typography>

                {selectedProducts.map((item, idx) => (
                    <Typography key={idx}>
                        {item.name} {item.quantity} {item.price}
                    </Typography>
                ))}
            </Box>
        </Container>
    );
};

export default OrderPayment;
