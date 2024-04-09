import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GRINDSIZE_SET, PERIOD_OPTIONS } from '~/utils/constants';

import { OrderProductSummaryInfo } from '~/components/ProductSelectBox';
import { formattedNumber } from '~/utils/utils';

const OrderItem = ({ item }: { item: OrderProductSummaryInfo }) => {
    return (
        <Box sx={{ display: 'flex', py: 0.5, borderBottom: '1px solid #F4EDCC' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, paddingY: 3 }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', paddingX: 3 }}>
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
                    <Typography variant="body1" sx={{ display: 'flex' }}>
                        {item.name}
                    </Typography>
                    {item.period ? (
                        <Typography variant="body2" sx={{ display: 'flex' }}>
                            {`${item.capacity}g / ${GRINDSIZE_SET[parseInt(item.grindSize)]} / ${PERIOD_OPTIONS[parseInt(item.period)]}`}
                        </Typography>
                    ) : (
                        <Typography variant="body2" sx={{ display: 'flex' }}>
                            {`${item.capacity}g / ${GRINDSIZE_SET[parseInt(item.grindSize)]}`}
                        </Typography>
                    )}
                </Box>

                <Typography variant="body2" sx={{ flex: 1.5, display: 'flex', justifyContent: 'center' }}>
                    {`${formattedNumber(item.price)}원`}
                </Typography>
            </Box>
        </Box>
    );
};

export default OrderItem;
