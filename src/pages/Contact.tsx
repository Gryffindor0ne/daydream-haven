import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Map from '~/components/location/Map';
import useScrollToTop from '~/hooks/useScrollToTop';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';

const Contact = () => {
    const { isMobile } = useResponsiveLayout();

    const titleStyle = {
        fontSize: isMobile ? 12 : 18,
        mb: isMobile ? 0.5 : 1,
    };

    const contentStyle = {
        fontSize: isMobile ? 8 : 15,
        mb: isMobile ? 2 : 5,
    };

    useScrollToTop();

    return (
        <Container maxWidth="lg">
            <Grid container spacing={1} sx={{ pt: isMobile ? 5 : 10, px: isMobile ? 2 : 10, mt: 10, mb: 30 }}>
                <Grid item xs={12}>
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
                            alt="Daydream Haven 본점 내부"
                            loading="lazy"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        sx={{
                            fontSize: isMobile ? 16 : 25,
                            mt: isMobile ? 3 : 6,
                            mb: isMobile ? 4 : 8,
                        }}
                    >
                        Daydream Haven 본점
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography sx={titleStyle}>전화</Typography>
                    <Typography sx={contentStyle}>031-123-4567</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography sx={titleStyle}>주소</Typography>
                    <Typography sx={contentStyle}>경기도 안양시 동안구 관악대로 236</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography sx={titleStyle}>영업시간</Typography>
                    <Typography sx={contentStyle}>
                        평일 오전 9시 ~ 오후 7시 (주말, 공휴일 오전 10시 ~ 오후 7시)
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography sx={titleStyle}>이메일</Typography>
                    <Typography sx={contentStyle}>
                        <a href="mailto:contact@daydreamhaven.com">contact@daydreamhaven.com</a>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ mt: 5 }}>
                        <Map />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Contact;
