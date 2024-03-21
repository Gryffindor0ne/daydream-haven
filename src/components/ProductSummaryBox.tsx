import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { OrderProductSummaryInfo } from '~/components/ProductSelectBox';
import QuantityButton from '~/components/QuantityButton';
import { formattedNumber } from '~/utils/utils';
import { GRINDSIZE_SET } from '~/utils/constants';

const ProductSummaryBox = ({
    product,
    onDelete,
    onQuantityChange,
}: {
    product: OrderProductSummaryInfo;
    onDelete: () => void;
    onQuantityChange: (newQuantity: number) => void;
}) => {
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
                marginTop: 2,
                marginBottom: 1,
                padding: 2,
                background: '#F4EDCC',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <Box sx={{ px: 2 }}>
                    <Typography sx={{ fontSize: 10, marginRight: 2 }}>{product.name}</Typography>
                    <Typography sx={{ fontSize: 16, marginRight: 2 }}>
                        {product.capacity}g / {GRINDSIZE_SET[parseInt(product.grindSize)]}
                    </Typography>
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
                <Typography sx={{ fontSize: 18, marginRight: 2 }}>{formattedNumber(product?.price)}원</Typography>
            </Box>
        </Box>
    );
};

export default ProductSummaryBox;
