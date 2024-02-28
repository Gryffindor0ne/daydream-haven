import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Map from '~/components/Map';

const Contact = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Container maxWidth="lg">
            <Box sx={{ paddingTop: 12, paddingX: isMobile ? 0 : 15, marginTop: 10, marginBottom: 30 }}>
                <Box
                    sx={{
                        maxWidth: '100%',
                        height: 'auto',
                        '& img': {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'none',
                            transition: 'filter 0.3s ease',
                            '&:hover': {
                                filter: 'grayscale(100%)',
                            },
                        },
                    }}
                >
                    <img src="src/assets/images/coffee-place.jpg" alt="coffee-place" />
                </Box>
                <Typography
                    sx={{
                        fontSize: 25,
                        marginTop: 10,
                        marginBottom: 8,
                    }}
                >
                    Daydream Haven 본점
                </Typography>
                <Typography sx={{ fontSize: 20, marginBottom: 2 }}>전화</Typography>
                <Typography sx={{ fontSize: 15, marginBottom: 5 }}>031-383-2321</Typography>
                <Typography sx={{ fontSize: 20, marginBottom: 2 }}>주소</Typography>
                <Typography sx={{ fontSize: 15, marginBottom: 5 }}>경기도 안양시 동안구 관악대로 213</Typography>
                <Typography sx={{ fontSize: 20, marginBottom: 2 }}>영업시간</Typography>
                <Typography sx={{ fontSize: 15, marginBottom: 1 }}>평일 오전 9시 ~ 오후 7시 </Typography>
                <Typography sx={{ fontSize: 15, marginBottom: 5 }}> (주말, 공휴일 오전 10시 ~ 오후 7시)</Typography>
                <Typography sx={{ fontSize: 20, marginBottom: 2 }}>이메일</Typography>
                <Typography sx={{ fontSize: 15, marginBottom: 1 }}>contact@daydreamhaven.com</Typography>
                <Box sx={{ marginTop: 10 }}>
                    <Map />
                </Box>
            </Box>
        </Container>
    );
};

export default Contact;
