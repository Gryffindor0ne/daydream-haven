import Box from '@mui/material/Box';
import OrderItemList, { Order } from '~/components/order/OrderItemList';

type OrderList = Order[];

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
