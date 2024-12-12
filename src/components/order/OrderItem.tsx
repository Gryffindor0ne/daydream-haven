import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';

import { GRINDSIZE_SET, PERIOD_OPTIONS } from '~/utils/constants';
import { formattedNumber } from '~/utils/utils';

export interface OrderHistoryProps {
    id: string;
    quantity: number;
    grindSize: string;
    capacity: string;
    price: number;
    thumbnail: string;
    name: string;
    period?: string;
}

const OrderItem = ({ item }: { item: OrderHistoryProps }) => {
    const { isTabletOrMobile } = useResponsiveLayout();

    return (
        <Box sx={{ display: 'flex', py: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', py: isTabletOrMobile ? 1 : 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', px: 2 }}>
                    <Box
                        sx={{
                            width: isTabletOrMobile ? 50 : 70,
                            aspectRatio: '1 / 1',
                            overflow: 'hidden',
                            borderRadius: 1,
                        }}
                    >
                        <img
                            src={item.thumbnail}
                            alt="thumbnail"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                </Box>
                <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', pl: isTabletOrMobile ? 1 : 2 }}>
                    <Typography sx={{ display: 'flex', mb: 0.5, fontSize: isTabletOrMobile ? 12 : 17 }}>
                        {item.name}
                    </Typography>
                    {item.period ? (
                        <Typography
                            sx={{ display: 'flex', color: '#AB886D', mb: 0.5, fontSize: isTabletOrMobile ? 9 : 12 }}
                        >
                            {`${item.capacity}g / ${GRINDSIZE_SET[parseInt(item.grindSize)]} / ${PERIOD_OPTIONS[parseInt(item.period)]}`}
                        </Typography>
                    ) : (
                        <Typography
                            sx={{ display: 'flex', color: '#AB886D', mb: 0.5, fontSize: isTabletOrMobile ? 9 : 12 }}
                        >
                            {`${item.capacity}g / ${GRINDSIZE_SET[parseInt(item.grindSize)]} -  ${item.quantity}개`}
                        </Typography>
                    )}

                    <Typography
                        sx={{ fontSize: isTabletOrMobile ? 12 : 17 }}
                    >{`${formattedNumber(item.price)}원`}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default OrderItem;
