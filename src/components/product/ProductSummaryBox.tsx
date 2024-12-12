import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { OrderItemSummaryInfo } from '~/components/product/ProductSelectBox';
import QuantityButton from '~/components/common/QuantityButton';
import { formattedNumber } from '~/utils/utils';
import { GRINDSIZE_SET, PERIOD_OPTIONS } from '~/utils/constants';
import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';

const ProductSummaryBox = ({
    product,
    onDelete,
    onQuantityChange,
}: {
    product: OrderItemSummaryInfo;
    onDelete: () => void;
    onQuantityChange: (newQuantity: number) => void;
}) => {
    const { currentPath } = useCurrentPathAndId();

    const handleDelete = () => {
        onDelete();
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            onQuantityChange(newQuantity);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 450,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                mt: 2,
                mb: 1,
                p: 2,
                background: '#F4EDCC',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ px: 2 }}>
                    <Typography sx={{ fontSize: 10, mr: 2 }}>{product.name}</Typography>

                    {currentPath === 'subscription' ? (
                        <Typography sx={{ fontSize: 16, mr: 2 }}>
                            {`${product.capacity}g / ${GRINDSIZE_SET[parseInt(product.grindSize)]} /
                            ${PERIOD_OPTIONS[parseInt(product.period as string)]}`}
                        </Typography>
                    ) : (
                        <Typography sx={{ fontSize: 16, mr: 2 }}>
                            {`${product.capacity}g / ${GRINDSIZE_SET[parseInt(product.grindSize)]}`}
                        </Typography>
                    )}
                </Box>

                <IconButton onClick={handleDelete}>
                    <HighlightOffIcon />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <QuantityButton
                    quantity={product.quantity}
                    onIncrease={() => handleQuantityChange(product.quantity + 1)}
                    onDecrease={() => handleQuantityChange(product.quantity - 1)}
                />
                <Typography sx={{ fontSize: 18, mr: 2 }}>{formattedNumber(product?.price)}원</Typography>
            </Box>
        </Box>
    );
};

export default ProductSummaryBox;
