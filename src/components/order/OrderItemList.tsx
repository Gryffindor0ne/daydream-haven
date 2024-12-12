import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OrderItem from '~/components/order/OrderItem';

import { OrderDetailProps } from '~/features/payment/paymentSaga';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { formatDateToDots } from '~/utils/utils';

const OrderItemList = ({ order }: { order: OrderDetailProps }) => {
    const { isTabletOrMobile } = useResponsiveLayout();

    return (
        <Box sx={{ my: 3, p: isTabletOrMobile ? 1 : 2, border: '3px solid #F4EDCC', borderRadius: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3, mb: 3, mt: 1.5 }}>
                <Typography sx={{ fontSize: isTabletOrMobile ? 15 : 20 }}>
                    {`${formatDateToDots(order.updatedAt)}`}{' '}
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: isTabletOrMobile ? 12 : 15 }}>
                    주문 상세정보
                </Typography>
            </Box>
            <Box sx={{ border: '1px solid #F4EDCC', borderRadius: 1 }}>
                {order.items.map((item) => (
                    <OrderItem key={item.id} item={item} />
                ))}
            </Box>
        </Box>
    );
};

export default OrderItemList;
