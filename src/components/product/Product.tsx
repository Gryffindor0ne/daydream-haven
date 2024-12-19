import { useNavigate } from 'react-router-dom';

import { Typography, Box } from '@mui/material';

import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { findPriceByCapacityAndPeriod } from '~/utils/product';
import { formatNumber } from '~/utils/number';
import { ProductInfo } from '~/types/product';

const Product = (content: ProductInfo) => {
    const { isTabletOrMobile } = useResponsiveLayout();

    const navigate = useNavigate();

    const { currentPath } = useCurrentPathAndId();

    const price200 = findPriceByCapacityAndPeriod(content, '200', 1);

    return (
        <Box
            sx={{
                pt: 2,
                px: isTabletOrMobile ? 1 : 3,
                pb: isTabletOrMobile ? 3 : 4,
            }}
        >
            <Box
                onClick={() => navigate(`/${currentPath}/${content.id}`)}
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
                onClick={() => navigate(`/${currentPath}/${content.id}`)}
                sx={{
                    fontFamily: 'Gowun Batang',
                    fontSize: 16,
                    mt: 1.5,
                    mb: 0.5,
                    px: 2,
                    cursor: 'pointer',
                }}
            >
                {content.name}
            </Typography>

            {currentPath === 'subscription' ? (
                <Typography sx={{ fontFamily: 'Gowun Batang', fontSize: 14, px: 2 }}>
                    {`${formatNumber(price200 as number)}원`}
                </Typography>
            ) : (
                <Typography sx={{ fontFamily: 'Gowun Batang', fontSize: 14, px: 2 }}>
                    {`${formatNumber(content.price)}원`}
                </Typography>
            )}
        </Box>
    );
};

export default Product;
