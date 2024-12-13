import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { OrderItemSummaryInfo } from '~/components/product/ProductSelectBox';
import QuantityButton from '~/components/common/QuantityButton';
import { formattedNumber } from '~/utils/utils';
import { GRINDSIZE_SET, PERIOD_OPTIONS } from '~/utils/constants';
import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';

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
    const { isMobile } = useResponsiveLayout();

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ px: 2 }}>
                    <Typography sx={{ fontSize: isMobile ? 11 : 13, mr: 2 }}>{product.name}</Typography>

                    {currentPath === 'subscription' ? (
                        <Typography sx={{ fontSize: isMobile ? 14 : 16, mr: 1, mt: 0.3, color: '#AB886D' }}>
                            {`${product.capacity}g / ${GRINDSIZE_SET[parseInt(product.grindSize)]} /
                            ${PERIOD_OPTIONS[parseInt(product.period as string)]}`}
                        </Typography>
                    ) : (
                        <Typography sx={{ fontSize: isMobile ? 14 : 16, mr: 1, mt: 0.3, color: '#AB886D' }}>
                            {`${product.capacity}g / ${GRINDSIZE_SET[parseInt(product.grindSize)]}`}
                        </Typography>
                    )}
                </Box>

                <IconButton onClick={handleDelete}>
                    <HighlightOffIcon />
                </IconButton>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    ml: isMobile ? 3 : 0,
                }}
            >
                <QuantityButton
                    quantity={product.quantity}
                    onIncrease={() => handleQuantityChange(product.quantity + 1)}
                    onDecrease={() => handleQuantityChange(product.quantity - 1)}
                />
                <Typography sx={{ fontSize: isMobile ? 14 : 18, mr: 2 }}>
                    {formattedNumber(product?.price)}원
                </Typography>
            </Box>
        </Box>
    );
};

export default ProductSummaryBox;
