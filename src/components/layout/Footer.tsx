import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const commonFooterTextAlign = isMobile ? 'center' : 'left';
    const commonIconSize = { fontSize: isMobile ? '1.7rem' : '1.5rem' };
    const lineHeight = isMobile ? '2.5' : '2.2';

    // '준비중' 메시지 상태
    const [message, setMessage] = useState('');

    const handleClick = () => {
        if (isMobile) {
            setMessage('준비중입니다.'); // 모바일일 경우 클릭 시 메시지 표시
            setTimeout(() => setMessage(''), 1000); // 1초 후 메시지 사라짐
        }
    };

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
                        align={commonFooterTextAlign}
                    >
                        Daydream Haven
                    </Typography>
                    <Typography variant="footer" align={commonFooterTextAlign}>
                        coffee roasters
                    </Typography>
                </Grid>
                <Grid item xs={12} md={5} sx={{ lineHeight }}>
                    <Typography variant="footer" align={commonFooterTextAlign}>
                        Daydream Haven Coffee.
                    </Typography>
                    <Typography variant="footer" align={commonFooterTextAlign}>
                        CEO. Lee Uk Jae
                    </Typography>
                    <Typography variant="footer" align={commonFooterTextAlign}>
                        135, Gwanak-daero, Dongan-gu, Anyang-si, Gyeonggi-do, Republic of Korea
                    </Typography>
                    <Typography variant="footer" align={commonFooterTextAlign}>
                        Hosting by Ardent Project.
                    </Typography>
                    <Typography variant="footer" align={commonFooterTextAlign}>
                        <Link component={RouterLink} to="/member/agreement">
                            Terms of Use
                        </Link>
                        {' | '}
                        <Link component={RouterLink} to="/member/privacy">
                            Privacy Policy
                        </Link>
                    </Typography>
                    <Typography variant="footer" align={commonFooterTextAlign}>
                        {`Copyright © Daydream Haven Coffee. ${new Date().getFullYear()}. All Rights Reserved. `}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3} sx={{ lineHeight }}>
                    <Typography variant="footer" align={commonFooterTextAlign}>
                        T. 031-123-4567
                    </Typography>
                    <Typography variant="footer" align={commonFooterTextAlign}>
                        master@daydreamhaven.com
                    </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mb: 2,
                        }}
                    >
                        {message && (
                            <Typography variant="body1" color="#B3A398" sx={{ marginTop: 2 }}>
                                {message}
                            </Typography>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: isMobile ? 'row' : 'column',
                            color: isMobile ? '#FFD23F' : '#B67352',
                            mt: isMobile ? 4 : 0,
                            mb: isMobile ? 4 : 0,
                            gap: isMobile ? 3 : 2,
                        }}
                    >
                        <Tooltip title={isMobile ? '' : '준비중입니다.'} onClick={handleClick}>
                            <Box sx={{ cursor: 'pointer' }}>
                                <InstagramIcon sx={{ commonIconSize }} />
                            </Box>
                        </Tooltip>
                        <Tooltip title={isMobile ? '' : '준비중입니다.'} onClick={handleClick}>
                            <Box sx={{ cursor: 'pointer' }}>
                                <StorefrontIcon sx={{ commonIconSize }} />
                            </Box>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
