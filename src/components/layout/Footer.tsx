import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box
            sx={{
                width: '100vw',
                height: 'auto',
                padding: 5,
                background: '#212121',
                color: '#B3A398',
            }}
        >
            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 2, sm: 2, md: 12 }}>
                <Grid item xs={12} md={2} sx={{ color: '#FEFBF6' }}>
                    <Typography
                        variant={isMobile ? 'h5' : 'h6'}
                        sx={{ fontFamily: 'Fraunces', fontWeight: '700' }}
                        align={isMobile ? 'center' : 'left'}
                    >
                        Daydream Haven
                    </Typography>
                    <Typography variant="footer" align={isMobile ? 'center' : 'left'}>
                        coffee roasters
                    </Typography>
                </Grid>
                <Grid item xs={12} md={5} sx={{ lineHeight: isMobile ? '2.5' : '2.2' }}>
                    <Typography variant="footer" align={isMobile ? 'center' : 'left'}>
                        Daydream Haven Coffee.
                    </Typography>
                    <Typography variant="footer" align={isMobile ? 'center' : 'left'}>
                        Ceo. Uk Jae Lee
                    </Typography>
                    <Typography variant="footer" align={isMobile ? 'center' : 'left'}>
                        135, Gwanak-daero, Dongan-gu, Anyang-si, Gyeonggi-do, Republic of Korea
                    </Typography>
                    <Typography variant="footer" align={isMobile ? 'center' : 'left'}>
                        Hosting by Ardent Project.
                    </Typography>
                    <Typography variant="footer" align={isMobile ? 'center' : 'left'}>
                        Terms of Use | Privacy Policy
                    </Typography>
                    <Typography variant="footer" align={isMobile ? 'center' : 'left'}>
                        {`Copyright © Daydream Haven Coffee. ${new Date().getFullYear()}. All Rights Reserved. `}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3} sx={{ lineHeight: isMobile ? '2.5' : '2.2' }}>
                    <Typography variant="footer" align={isMobile ? 'center' : 'left'}>
                        T. 031-123-4567
                    </Typography>
                    <Typography variant="footer" align={isMobile ? 'center' : 'left'}>
                        master@daydreamhaven.com
                    </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: isMobile ? 'row' : 'column',
                            color: isMobile ? '#FFD23F' : '#B67352',
                            marginTop: isMobile ? 4 : 0,
                            gap: isMobile ? 3 : 2,
                        }}
                    >
                        <InstagramIcon sx={{ fontSize: isMobile ? '1.7rem' : '1.5rem' }} />
                        <StorefrontIcon sx={{ fontSize: isMobile ? '1.7rem' : '1.5rem' }} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
