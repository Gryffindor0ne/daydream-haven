import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { GRINDSIZE_SET } from '~/utils/constants';

import { OrderProductSummaryInfo } from '~/components/ProductSelectBox';
import { formattedNumber } from '~/utils/utils';

type CartItemProps = {
    item: OrderProductSummaryInfo;
    fee: boolean;
    checked: boolean;
    handler: () => void;
};

const CartItem = ({ item, fee, checked, handler }: CartItemProps) => {
    return (
        <Box sx={{ display: 'flex', py: 0.5, borderBottom: '1px solid #F4EDCC' }}>
            <Checkbox
                checked={checked}
                onChange={handler}
                size="small"
                color="default"
                sx={{
                    '&:hover': { bgcolor: 'transparent' },
                }}
            />
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
                            src={item.product_image}
                            alt="product_image"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                </Box>
                <Box sx={{ flex: 3.5, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body1" sx={{ display: 'flex' }}>
                        {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex' }}>
                        {`${item.weight}g / ${GRINDSIZE_SET[parseInt(item.grindSize)]}`}
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ flex: 1.5, display: 'flex', justifyContent: 'center' }}>
                    {item.quantity}
                </Typography>
                <Typography variant="body2" sx={{ flex: 1.5, display: 'flex', justifyContent: 'center' }}>
                    {`${formattedNumber(item.price)}원`}
                </Typography>
                <Typography variant="body2" sx={{ flex: 1.5, display: 'flex', justifyContent: 'center' }}>
                    {fee ? '3,000원 조건' : '배송비 없음'}
                </Typography>
            </Box>
        </Box>
    );
};

export default CartItem;
