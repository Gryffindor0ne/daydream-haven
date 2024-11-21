import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OrderItem from '~/components/order/OrderItem';

import { OrderDetailProps } from '~/features/payment/paymentSaga';
import { formatDateToDots } from '~/utils/utils';

const OrderItemList = ({ order }: { order: OrderDetailProps }) => {
    return (
        <Box sx={{ my: 5, p: 2, border: '3px solid #F4EDCC', borderRadius: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3, mb: 3 }}>
                <Typography variant="h5">{`${formatDateToDots(order.updatedAt)}`} </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center' }}>주문 상세정보</Typography>
            </Box>
            {order.items.map((item) => (
                <OrderItem key={item.id} item={item} />
            ))}
        </Box>
    );
};

export default OrderItemList;
