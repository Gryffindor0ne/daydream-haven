import { Box, Typography, IconButton } from '@mui/material';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import QuantityButton from '~/components/common/QuantityButton';
import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { GRINDSIZE_SET, PERIOD_OPTIONS } from '~/utils/constants';
import { formatNumber } from '~/utils/number';
import { OrderItemSummaryInfo } from '~/types/order';
interface ProductSummaryBoxProps {
    product: OrderItemSummaryInfo;
    onDelete: () => void;
    onQuantityChange: (newQuantity: number) => void;
}

const styles = {
    container: {
        maxWidth: 450,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mt: 2,
        mb: 1,
        p: 2,
        background: '#F4EDCC',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        mb: 1,
    },
    productInfo: {
        px: 2,
    },
    productName: (isMobile: boolean) => ({
        fontSize: isMobile ? 15 : 16,
        mr: 2,
    }),
    productDetails: (isMobile: boolean) => ({
        fontSize: isMobile ? 15 : 16,
        mr: 1,
        mt: 0.3,
        color: '#AB886D',
    }),
    footer: (isMobile: boolean) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ml: isMobile ? 3 : 0,
    }),
    price: (isMobile: boolean) => ({
        fontSize: isMobile ? 16 : 20,
        mr: 2,
    }),
};

const ProductDetails = ({
    product,
    currentPath,
    isMobile,
}: {
    product: OrderItemSummaryInfo;
    currentPath: string;
    isMobile: boolean;
}) => {
    const getProductDetails = () => {
        const baseDetails = `${product.capacity}g / ${GRINDSIZE_SET[parseInt(product.grindSize)]}`;
        return currentPath === 'subscription' && product.period
            ? `${baseDetails} / ${PERIOD_OPTIONS[parseInt(product.period)]}`
            : baseDetails;
    };

    return (
        <Box sx={styles.productInfo}>
            <Typography sx={styles.productName(isMobile)}>{product.name}</Typography>
            <Typography sx={styles.productDetails(isMobile)}>{getProductDetails()}</Typography>
        </Box>
    );
};

const ProductSummaryBox: React.FC<ProductSummaryBoxProps> = ({ product, onDelete, onQuantityChange }) => {
    const { currentPath } = useCurrentPathAndId();
    const { isMobile } = useResponsiveLayout();

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            onQuantityChange(newQuantity);
        }
    };

    return (
        <Box sx={styles.container}>
            <Box sx={styles.header}>
                <ProductDetails product={product} currentPath={currentPath} isMobile={isMobile} />
                <IconButton onClick={onDelete}>
                    <HighlightOffIcon />
                </IconButton>
            </Box>

            <Box sx={styles.footer(isMobile)}>
                <QuantityButton
                    quantity={product.quantity}
                    onIncrease={() => handleQuantityChange(product.quantity + 1)}
                    onDecrease={() => handleQuantityChange(product.quantity - 1)}
                />
                <Typography sx={styles.price(isMobile)}>{formatNumber(product.price)}원</Typography>
            </Box>
        </Box>
    );
};

export default ProductSummaryBox;
