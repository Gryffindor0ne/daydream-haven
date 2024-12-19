import { Box } from '@mui/material';

import OrderItemList from '~/components/order/OrderItemList';
import { OrderDetailProps } from '~/types/order';

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
