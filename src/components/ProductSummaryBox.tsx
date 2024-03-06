import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { OrderProductSummaryInfo } from '~/components/ProductSelectBox';
import QuantityButton from '~/components/QuantityButton';
import { formattedNumber } from '~/utils/utils';

const ProductSummaryBox = ({
    product,
    onDelete,
    onQuantityChange,
}: {
    product: OrderProductSummaryInfo;
    onDelete: () => void;
    onQuantityChange: (newQuantity: number) => void;
}) => {
    const grindSizeGroups = [
        '',
        '갈지않음(홀빈)',
        '에스프레소',
        '모카포트',
        '에어로프레스',
        '프렌치프레스',
        '핸드드립',
        '커피메이커',
        '더치커피',
    ];
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
                <Box>
                    <Typography sx={{ fontSize: 10, marginRight: 2 }}>{product.name}</Typography>
                    <Typography sx={{ fontSize: 16, marginRight: 2 }}>
                        {product.weight}g / {grindSizeGroups[parseInt(product.grindSize)]}
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
