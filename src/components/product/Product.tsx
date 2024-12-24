import { useNavigate } from 'react-router-dom';

import { Typography, Box } from '@mui/material';

import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { findPriceByCapacityAndPeriod } from '~/utils/product';
import { formatNumber } from '~/utils/number';
import { ProductInfo } from '~/types/product';

const Product = (content: ProductInfo) => {
    const { isMobile } = useResponsiveLayout();
    const navigate = useNavigate();
    const { currentPath } = useCurrentPathAndId();

    const price200 = findPriceByCapacityAndPeriod(content, '200', 1);

    const handleNavigate = () => {
        navigate(`/${currentPath}/${content.id}`);
    };

    return (
        <Box
            sx={{
                pt: 2,
                px: isMobile ? 0 : 2,
                pb: isMobile ? 2 : 5,
            }}
        >
            <Box
                onClick={handleNavigate}
                sx={{
                    maxWidth: '100%',
                    height: 'auto',

                    '& img': {
                        width: '100%',
                        height: '100%',
                        filter: 'none',
                        transition: 'filter 0.3s ease',
                        '&:hover': {
                            filter: 'grayscale(100%)',
                        },
                        cursor: 'pointer',
                    },
                }}
            >
                <img src={content.thumbnail} alt={`product_${content.id}`} />
            </Box>
            <Typography
                onClick={handleNavigate}
                sx={{
                    fontFamily: 'Gowun Batang',
                    fontSize: isMobile ? 13 : 18,
                    mt: isMobile ? 0.5 : 1,
                    mb: 0.5,
                    px: 2,
                    cursor: 'pointer',
                }}
            >
                {content.name}
            </Typography>

            <Typography sx={{ fontFamily: 'Gowun Batang', fontSize: isMobile ? 15 : 20, fontWeight: 'bold', px: 2 }}>
                {currentPath === 'subscription'
                    ? `${formatNumber(price200 as number)}원`
                    : `${formatNumber(content.price)}원`}
            </Typography>
        </Box>
    );
};

export default Product;
