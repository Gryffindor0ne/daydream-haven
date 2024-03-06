import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ShoppingCart = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ minHeight: '75vh', paddingTop: 12, marginTop: 10 }}>
                <Typography>ShoppingCart</Typography>
            </Box>
        </Container>
    );
};

export default ShoppingCart;
