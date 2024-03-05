import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { ProductInfo } from '~/components/ProductsList';

const Product = (content: ProductInfo) => {
    const theme = useTheme();
    const isBrowser = useMediaQuery(theme.breakpoints.down('lg'));
    const formattedNumber = new Intl.NumberFormat().format(content.price);
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                paddingTop: 2,
                paddingX: isBrowser ? 1 : 3,
                paddingBottom: isBrowser ? 3 : 4,
            }}
        >
            <Box
                onClick={() => navigate(`/shop/${content.id}`)}
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
                <img src={content.product_image} alt={`product_${content.id}`} />
            </Box>
            <Typography
                onClick={() => navigate(`/shop/${content.id}`)}
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
            <Typography
                sx={{ fontFamily: 'Gowun Batang', fontSize: 14, paddingX: 2 }}
            >{`${formattedNumber}원`}</Typography>
        </Box>
    );
};

export default Product;
