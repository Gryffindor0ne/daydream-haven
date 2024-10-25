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

const Icons = {
    INSTAGRAM: 'instagram',
    STORE: 'store',
} as const;

type IconType = (typeof Icons)[keyof typeof Icons];

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const commonFooterTextAlign = isMobile ? 'center' : 'left';
    const commonIconSize = { fontSize: isMobile ? '1.7rem' : '1.5rem' };
    const lineHeight = isMobile ? '2.5' : '2.2';

    // 열려 있는 Tooltip을 관리하는 단일 상태 변수
    const [openTooltip, setOpenTooltip] = useState('');

    const handleClick = (icon: IconType) => {
        if (isMobile) {
            setOpenTooltip(icon);
            setTimeout(() => setOpenTooltip(''), 1000); // 1초 후 Tooltip 사라짐
        }
    };

    const handleMouseEnter = (icon: IconType) => {
        if (!isMobile) {
            setOpenTooltip(icon);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setOpenTooltip('');
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
                            flexDirection: isMobile ? 'row' : 'column',
                            color: isMobile ? '#FFD23F' : '#B67352',
                            mt: isMobile ? 4 : 0,
                            mb: isMobile ? 4 : 0,
                            gap: isMobile ? 3 : 2,
                        }}
                    >
                        <Tooltip
                            title="준비중입니다."
                            placement="top"
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        fontSize: '1rem',
                                        padding: '10px 15px',
                                    },
                                },
                            }}
                            open={openTooltip === Icons.INSTAGRAM}
                            onMouseEnter={() => handleMouseEnter(Icons.INSTAGRAM)}
                            onMouseLeave={handleMouseLeave}
                            disableHoverListener={isMobile}
                            disableFocusListener={isMobile}
                        >
                            <Box onClick={() => handleClick(Icons.INSTAGRAM)} sx={{ cursor: 'pointer' }}>
                                <InstagramIcon sx={commonIconSize} />
                            </Box>
                        </Tooltip>

                        <Tooltip
                            title="준비중입니다."
                            placement="top"
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        fontSize: '1rem',
                                        padding: '10px 15px',
                                    },
                                },
                            }}
                            open={openTooltip === Icons.STORE}
                            onMouseEnter={() => handleMouseEnter(Icons.STORE)}
                            onMouseLeave={handleMouseLeave}
                            disableHoverListener={isMobile}
                            disableFocusListener={isMobile}
                        >
                            <Box onClick={() => handleClick(Icons.STORE)} sx={{ cursor: 'pointer' }}>
                                <StorefrontIcon sx={commonIconSize} />
                            </Box>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
