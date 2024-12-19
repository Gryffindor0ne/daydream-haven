import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import OrderItem from '~/components/order/OrderItem';

import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { formatDateToDots } from '~/utils/date';
import { OrderDetailProps } from '~/types/order';

const OrderItemList = ({ order }: { order: OrderDetailProps }) => {
    const { isTabletOrMobile } = useResponsiveLayout();
    const navigate = useNavigate();

    const handleOrderDetailClick = (order: OrderDetailProps) => {
        navigate(`/order/detail/${order.id}`, {
            state: {
                orderDetails: order,
            },
        });
    };

    return (
        <Box sx={{ my: 3, p: isTabletOrMobile ? 1 : 2, border: '3px solid #F4EDCC', borderRadius: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3, mb: 3, mt: 1.5 }}>
                <Typography sx={{ fontSize: isTabletOrMobile ? 15 : 20 }}>
                    {`${formatDateToDots(order.updatedAt)}`}{' '}
                </Typography>
                <Typography
                    onClick={() => handleOrderDetailClick(order)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: isTabletOrMobile ? 12 : 15,
                        cursor: 'pointer',
                    }}
                >
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
