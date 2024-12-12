import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

import { useAppDispatch } from '~/app/reduxHooks';
import { OrderItemSummaryInfo } from '~/components/product/ProductSelectBox';
import QuantityButton from '~/components/common/QuantityButton';
import { updateCartItemQuantity } from '~/features/cart/cartSlice';
import { GRINDSIZE_SET, PERIOD_OPTIONS } from '~/utils/constants';
import { formattedNumber } from '~/utils/utils';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { Grid } from '@mui/material';

type CartItemProps = {
    item: OrderItemSummaryInfo;
    deliveryFeeCondition: string;
    checked: boolean;
    handler: () => void;
};

const CartItem = ({ item, deliveryFeeCondition, checked, handler }: CartItemProps) => {
    const dispatch = useAppDispatch();

    const { isMobile } = useResponsiveLayout();

    const handleQuantityChange = (newQuantity: number) => {
        const productId = item.id;
        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({ productId, newQuantity }));
        }
    };

    return (
        <>
            {isMobile ? (
                <Grid container spacing={1} sx={{ py: 2, borderBottom: '1px solid #F4EDCC' }}>
                    <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Box
                            sx={{
                                width: 50,
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
                    </Grid>
                    <Grid item xs={7}>
                        <Box>
                            <Typography sx={{ fontSize: 12 }}>{item.name}</Typography>
                            {item.period ? (
                                <Typography sx={{ fontSize: 9, color: '#AB886D' }}>
                                    {`${item.capacity}g / ${GRINDSIZE_SET[parseInt(item.grindSize)]} / ${PERIOD_OPTIONS[parseInt(item.period)]}`}
                                </Typography>
                            ) : (
                                <Typography sx={{ fontSize: 9, color: '#AB886D' }}>
                                    {`${item.capacity}g / ${GRINDSIZE_SET[parseInt(item.grindSize)]}`}
                                </Typography>
                            )}
                        </Box>
                        <Typography
                            sx={{
                                fontSize: 12,
                                fontWeight: 600,
                                py: 1,
                            }}
                        >
                            {`${formattedNumber(item.price)}원`}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 9,
                                py: 1,
                            }}
                        >
                            배송비 3,000원 [조건] / 기본배송
                        </Typography>
                        <Box>
                            <QuantityButton
                                quantity={item.quantity}
                                onIncrease={() => handleQuantityChange(item.quantity + 1)}
                                onDecrease={() => handleQuantityChange(item.quantity - 1)}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Checkbox
                            checked={checked}
                            onChange={handler}
                            size="small"
                            color="default"
                            sx={{
                                '&:hover': { bgcolor: 'transparent' },
                            }}
                        />
                    </Grid>
                </Grid>
            ) : (
                <Box sx={{ display: 'flex', borderBottom: '1px solid #F4EDCC' }}>
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
                            flexDirection: 'row',
                            flexGrow: 1,
                            py: 3,
                        }}
                    >
                        <Box sx={{ flex: 1.5, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                            <Box
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    px: 3,
                                    py: 2,
                                    width: 180,
                                }}
                            >
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
                                <Typography sx={{ display: 'flex', fontSize: 16, py: 1 }}>{item.name}</Typography>
                                {item.period ? (
                                    <Typography sx={{ display: 'flex', fontSize: 14, color: '#AB886D' }}>
                                        {`${item.capacity}g / ${GRINDSIZE_SET[parseInt(item.grindSize)]} / ${PERIOD_OPTIONS[parseInt(item.period)]}`}
                                    </Typography>
                                ) : (
                                    <Typography sx={{ display: 'flex', fontSize: 14, color: '#AB886D' }}>
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
                            <Typography
                                sx={{
                                    flex: 1.5,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: 15,
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
                            <Typography
                                sx={{
                                    flex: 1.5,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: 15,
                                }}
                            >
                                {deliveryFeeCondition}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default CartItem;
