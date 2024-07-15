import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { useMediaQuery, useTheme } from '@mui/material';

import { useAppDispatch } from '~/app/reduxHooks';
import { OrderProductSummaryInfo } from '~/components/product/ProductSelectBox';
import QuantityButton from '~/components/common/QuantityButton';
import { updateCartItemQuantity } from '~/features/cart/cartSlice';
import { GRINDSIZE_SET, PERIOD_OPTIONS } from '~/utils/constants';
import { formattedNumber } from '~/utils/utils';

type CartItemProps = {
    item: OrderProductSummaryInfo;
    deliveryFeeCondition: string;
    checked: boolean;
    handler: () => void;
};

const CartItem = ({ item, deliveryFeeCondition, checked, handler }: CartItemProps) => {
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleQuantityChange = (newQuantity: number) => {
        const productId = item.id;
        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({ productId, newQuantity }));
        }
    };

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
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: isMobile ? 'column' : 'row',
                    flexGrow: 1,
                    paddingY: 3,
                }}
            >
                <Box sx={{ flex: 1.5, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            paddingX: 3,
                            py: 2,
                            width: 180,
                        }}
                    >
                        <Box
                            sx={{
                                width: isMobile ? 60 : 70,
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
                        <Typography sx={{ display: 'flex', fontSize: isMobile ? 13 : 16, py: 1 }}>
                            {item.name}
                        </Typography>
                        {item.period ? (
                            <Typography sx={{ display: 'flex', fontSize: isMobile ? 12 : 14 }}>
                                {`${item.capacity}g / ${GRINDSIZE_SET[parseInt(item.grindSize)]} / ${PERIOD_OPTIONS[parseInt(item.period)]}`}
                            </Typography>
                        ) : (
                            <Typography sx={{ display: 'flex', fontSize: isMobile ? 12 : 14 }}>
                                {`${item.capacity}g / ${GRINDSIZE_SET[parseInt(item.grindSize)]}`}
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        flex: 0.2,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        py: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <QuantityButton
                            quantity={item.quantity}
                            onIncrease={() => handleQuantityChange(item.quantity + 1)}
                            onDecrease={() => handleQuantityChange(item.quantity - 1)}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        flex: 0.7,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        py: 1,
                        width: 180,
                    }}
                >
                    {isMobile ? (
                        <Typography sx={{ flex: 1, display: 'flex', justifyContent: 'center', fontSize: 11 }}>
                            금액 :
                        </Typography>
                    ) : null}
                    <Typography
                        sx={{
                            flex: 1.5,
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: isMobile ? 13 : 15,
                            fontWeight: isMobile ? 'bold' : '',
                        }}
                    >
                        {`${formattedNumber(item.price)}원`}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flex: 0.7,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        py: 1,
                        width: 180,
                    }}
                >
                    {isMobile ? (
                        <Typography sx={{ flex: 1, display: 'flex', justifyContent: 'center', fontSize: 11 }}>
                            배송 :
                        </Typography>
                    ) : null}

                    <Typography
                        sx={{ flex: 1.5, display: 'flex', justifyContent: 'center', fontSize: isMobile ? 13 : 15 }}
                    >
                        {deliveryFeeCondition}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default CartItem;
