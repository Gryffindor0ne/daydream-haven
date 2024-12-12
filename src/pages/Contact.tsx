import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Map from '~/components/location/Map';
import useScrollToTop from '~/hooks/useScrollToTop';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';

const Contact = () => {
    const { isMobile } = useResponsiveLayout();

    useScrollToTop();

    return (
        <Container maxWidth="lg">
            <Box sx={{ pt: 12, px: isMobile ? 0 : 15, mt: 10, mb: 30 }}>
                <Box
                    sx={{
                        maxWidth: '100%',
                        height: 'auto',
                        '& img': {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        },
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1533630757306-cbadb934bcb1?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="coffee-shop"
                    />
                </Box>
                <Typography
                    sx={{
                        fontSize: 25,
                        mt: 10,
                        mb: 8,
                    }}
                >
                    Daydream Haven 본점
                </Typography>
                <Typography sx={{ fontSize: 20, mb: 2 }}>전화</Typography>
                <Typography sx={{ fontSize: 15, mb: 5 }}>031-123-4567</Typography>
                <Typography sx={{ fontSize: 20, mb: 2 }}>주소</Typography>
                <Typography sx={{ fontSize: 15, mb: 5 }}>경기도 안양시 동안구 관악대로 213</Typography>
                <Typography sx={{ fontSize: 20, mb: 2 }}>영업시간</Typography>
                <Typography sx={{ fontSize: 15, mb: 1 }}>평일 오전 9시 ~ 오후 7시 </Typography>
                <Typography sx={{ fontSize: 15, mb: 5 }}> (주말, 공휴일 오전 10시 ~ 오후 7시)</Typography>
                <Typography sx={{ fontSize: 20, mb: 2 }}>이메일</Typography>
                <Typography sx={{ fontSize: 15, mb: 1 }}>contact@daydreamhaven.com</Typography>
                <Box sx={{ mt: 10 }}>
                    <Map />
                </Box>
            </Box>
        </Container>
    );
};

export default Contact;
