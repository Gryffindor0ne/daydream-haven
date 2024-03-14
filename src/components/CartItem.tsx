import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { GRINDSIZE_SET } from '~/utils/constants';

import { OrderProductSummaryInfo } from '~/components/ProductSelectBox';
import { formattedNumber } from '~/utils/utils';
import QuantityButton from '~/components/QuantityButton';
import { updateCartItemQuantity } from '~/features/cart/cartSlice';
import { useAppDispatch } from '~/app/reduxHooks';

type CartItemProps = {
    item: OrderProductSummaryInfo;
    deliveryFeeCondition: string;
    checked: boolean;
    handler: () => void;
};

const CartItem = ({ item, deliveryFeeCondition, checked, handler }: CartItemProps) => {
    const dispatch = useAppDispatch();

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

                <QuantityButton
                    quantity={item.quantity}
                    onIncrease={() => handleQuantityChange(item.quantity + 1)}
                    onDecrease={() => handleQuantityChange(item.quantity - 1)}
                />

                <Typography variant="body2" sx={{ flex: 1.5, display: 'flex', justifyContent: 'center' }}>
                    {`${formattedNumber(item.price)}원`}
                </Typography>
                <Typography variant="body2" sx={{ flex: 1.5, display: 'flex', justifyContent: 'center' }}>
                    {deliveryFeeCondition}
                </Typography>
            </Box>
        </Box>
    );
};

export default CartItem;
