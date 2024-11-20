import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { OrderItemSummaryInfo } from '~/components/product/ProductSelectBox';
import { GRINDSIZE_SET, PERIOD_OPTIONS } from '~/utils/constants';
import { formattedNumber } from '~/utils/utils';

const OrderItem = ({ item }: { item: OrderItemSummaryInfo }) => {
    return (
        <Box sx={{ display: 'flex', py: 0.5, border: '1px solid #F4EDCC' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', py: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', px: 3 }}>
                    <Box
                        sx={{
                            width: 70,
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
                <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" sx={{ display: 'flex', mb: 0.5 }}>
                        {item.name}
                    </Typography>
                    {item.period ? (
                        <Typography variant="body2" sx={{ display: 'flex', color: '#AB886D', mb: 0.7 }}>
                            {`${item.capacity}g / ${GRINDSIZE_SET[parseInt(item.grindSize)]} / ${PERIOD_OPTIONS[parseInt(item.period)]}`}
                        </Typography>
                    ) : (
                        <Typography variant="body2" sx={{ display: 'flex', color: '#AB886D', mb: 0.7 }}>
                            {`${item.capacity}g / ${GRINDSIZE_SET[parseInt(item.grindSize)]} -  ${item.quantity}개`}
                        </Typography>
                    )}

                    <Typography variant="body1">{`${formattedNumber(item.price)}원`}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default OrderItem;
