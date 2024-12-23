import { Grid, Box, Typography, Checkbox } from '@mui/material';

import { useAppDispatch } from '~/app/reduxHooks';
import QuantityButton from '~/components/common/QuantityButton';
import { updateCartItemQuantity } from '~/features/cart/cartSlice';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { GRINDSIZE_SET, PERIOD_OPTIONS } from '~/utils/constants';
import { formatNumber } from '~/utils/number';
import { CartItemProps } from '~/types/cart';

const CartItem: React.FC<CartItemProps> = ({ item, deliveryFeeCondition, checked, handler }) => {
    const dispatch = useAppDispatch();
    const { isMobile } = useResponsiveLayout();

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({ productId: item.id, newQuantity }));
        }
    };

    const ProductInfo = () => (
        <Box>
            <Typography sx={{ fontSize: isMobile ? 15 : 18, py: 1 }}>{item.name}</Typography>
            <Typography sx={{ fontSize: isMobile ? 12 : 15, color: '#AB886D' }}>
                {`${item.capacity}g / ${GRINDSIZE_SET[parseInt(item.grindSize)]}${
                    item.period ? ` / ${PERIOD_OPTIONS[parseInt(item.period)]}` : ''
                }`}
            </Typography>
        </Box>
    );

    const ProductImage = () => (
        <Box
            sx={{
                width: isMobile ? 50 : 70,
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                borderRadius: 1,
            }}
        >
            <img src={item.thumbnail} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
    );

    const ProductPrice = () => (
        <Typography
            sx={{
                fontSize: isMobile ? 15 : 18,
                fontWeight: isMobile ? 600 : 400,
                py: 1,
                ...(isMobile ? {} : { justifyContent: 'center' }),
                ...(isMobile ? {} : { display: 'flex' }),
            }}
        >
            {`${formatNumber(item.price)}원`}
        </Typography>
    );

    const CustomCheckbox = () => (
        <Checkbox
            checked={checked}
            onChange={handler}
            size="small"
            color="default"
            sx={{ '&:hover': { bgcolor: 'transparent' } }}
        />
    );

    const MobileLayout = () => (
        <Grid container spacing={1} sx={{ py: 2, borderBottom: '1px solid #F4EDCC' }}>
            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <ProductImage />
            </Grid>
            <Grid item xs={7}>
                <ProductInfo />
                <ProductPrice />
                <Typography sx={{ fontSize: 12, py: 1 }}>배송비 3,000원 [조건] / 기본배송</Typography>
                <QuantityButton
                    quantity={item.quantity}
                    onIncrease={() => handleQuantityChange(item.quantity + 1)}
                    onDecrease={() => handleQuantityChange(item.quantity - 1)}
                />
            </Grid>
            <Grid item xs={2}>
                <CustomCheckbox />
            </Grid>
        </Grid>
    );

    const DesktopLayout = () => (
        <Box sx={{ display: 'flex', borderBottom: '1px solid #F4EDCC' }}>
            <CustomCheckbox />
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, py: 3 }}>
                <Box sx={{ flex: 1.5, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flex: 1, px: 3, py: 2, width: 180 }}>
                        <ProductImage />
                    </Box>
                    <Box sx={{ flex: 3 }}>
                        <ProductInfo />
                    </Box>
                </Box>
                <Box sx={{ flex: 0.8, display: 'flex', alignItems: 'center', py: 2 }}>
                    <QuantityButton
                        quantity={item.quantity}
                        onIncrease={() => handleQuantityChange(item.quantity + 1)}
                        onDecrease={() => handleQuantityChange(item.quantity - 1)}
                    />
                </Box>
                <Box sx={{ flex: 0.5, display: 'flex', alignItems: 'center', py: 1, width: 180 }}>
                    <ProductPrice />
                </Box>
                <Box sx={{ flex: 0.7, display: 'flex', alignItems: 'center', py: 1, width: 180 }}>
                    <Typography sx={{ flex: 1.5, display: 'flex', justifyContent: 'center', fontSize: 18 }}>
                        {deliveryFeeCondition}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );

    return isMobile ? <MobileLayout /> : <DesktopLayout />;
};

export default CartItem;
