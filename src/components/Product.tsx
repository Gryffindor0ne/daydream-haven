import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { ProductInfo } from '~/components/ProductsList';
import { findPriceByCapacityAndPeriod, formattedNumber } from '~/utils/utils';
import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';

const Product = (content: ProductInfo) => {
    const theme = useTheme();
    const isBrowser = useMediaQuery(theme.breakpoints.down('lg'));

    const navigate = useNavigate();

    const { currentPath } = useCurrentPathAndId();

    const price200 = findPriceByCapacityAndPeriod(content, '200', 1);

    return (
        <Box
            sx={{
                paddingTop: 2,
                paddingX: isBrowser ? 1 : 3,
                paddingBottom: isBrowser ? 3 : 4,
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
                    marginTop: 1.5,
                    marginBottom: 0.5,
                    paddingX: 2,
                    cursor: 'pointer',
                }}
            >
                {content.name}
            </Typography>

            {price200 !== 0 ? (
                <Typography sx={{ fontFamily: 'Gowun Batang', fontSize: 14, paddingX: 2 }}>
                    {`${formattedNumber(price200 as number)}원`}
                </Typography>
            ) : (
                <Typography sx={{ fontFamily: 'Gowun Batang', fontSize: 14, paddingX: 2 }}>
                    {`${formattedNumber(content.price)}원`}
                </Typography>
            )}
        </Box>
    );
};

export default Product;
