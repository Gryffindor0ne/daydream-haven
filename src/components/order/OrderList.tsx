import Box from '@mui/material/Box';
import OrderItemList from '~/components/order/OrderItemList';
import { OrderDetailProps } from '~/features/payment/paymentSaga';

type OrderList = OrderDetailProps[];

const OrderList = ({ orders }: { orders: OrderList }) => {
    return (
        <Box>
            {orders.map((order) => (
                <OrderItemList key={order.id} order={order} />
            ))}
        </Box>
    );
};

export default OrderList;
