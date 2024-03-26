import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useMediaQuery, useTheme } from '@mui/material';
import { categoryItems } from '~/utils/constants';

const Home = () => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.up('md'));

    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: '75vh' }}>
            <Box
                onClick={() => navigate(`/${categoryItems[0].toLowerCase()}`)}
                sx={{
                    marginTop: 10,
                    maxWidth: '100%',
                    height: 'auto',
                    '@media (min-width: 900px)': {
                        overflow: 'hidden',
                    },
                    '& img': {
                        width: '100%',
                        marginBottom: isTablet ? '-80%' : '0%',
                        objectFit: 'cover',
                        filter: 'grayscale(100%)',
                        transition: 'filter 0.3s ease-in-out',
                        '&:hover': {
                            filter: 'brightness(150%)',
                        },
                    },
                    cursor: 'pointer',
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1529177648130-52a2690bbb1e?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="haven"
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    sx={{
                        marginTop: 18,
                        fontSize: isTablet ? 20 : 15,
                        fontWeight: 400,
                    }}
                >
                    Daydream Haven은 커피를 통해 모든 이들의 쉼을 응원합니다.
                </Typography>
                <Typography
                    sx={{
                        marginTop: 3,
                        marginBottom: 18,
                        fontSize: isTablet ? 17 : 14,
                    }}
                >
                    나아가 자유로운 몽상을 할 수 있기를 바랍니다.
                </Typography>
            </Box>
            <Box
                onClick={() => navigate(`/${categoryItems[1].toLowerCase()}`)}
                sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    '@media (max-width: 900px)': {
                        width: '100vw',
                        height: '0vh',
                    },
                    '& img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'none',
                        transition: 'filter 0.3s ease-in-out',
                        '&:hover': {
                            filter: 'grayscale(100%)',
                        },
                    },
                    cursor: 'pointer',
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="coffee-drip"
                />
            </Box>
            <Box sx={{ display: isTablet ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    sx={{
                        marginTop: 18,
                        marginBottom: 3,
                        fontSize: isTablet ? 22 : 15,
                        fontWeight: 400,
                    }}
                >
                    Daydream Haven은 신선한 커피를 지향합니다.
                </Typography>
                <Typography
                    sx={{
                        marginTop: 2,
                        fontSize: isTablet ? 17 : 14,
                    }}
                >
                    지속적인 산지 관리, 꾸준한 로스팅 연구, 원두의 신선함 유지 관리를 통해
                </Typography>
                <Typography
                    sx={{
                        marginTop: 1,
                        fontSize: isTablet ? 17 : 14,
                    }}
                >
                    당신의 쉼을 서포트합니다.
                </Typography>
                <Typography
                    onClick={() => navigate(`/${categoryItems[1].toLowerCase()}`)}
                    sx={{
                        marginTop: 5,
                        marginBottom: 18,
                        fontFamily: 'Gowun Batang',
                        fontSize: isTablet ? 14 : 11,
                        cursor: 'pointer',
                    }}
                >
                    원두 보러가기 🫒
                </Typography>
            </Box>
            <Box
                onClick={() => navigate(`/${categoryItems[2].toLowerCase()}`)}
                sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    '@media (max-width: 900px)': {
                        width: '100vw',
                        height: '0vh',
                    },

                    '& img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'none',
                        transition: 'filter 0.3s ease-in-out',
                        '&:hover': {
                            filter: 'grayscale(100%)',
                        },
                    },
                    cursor: 'pointer',
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="coffee-roasting"
                />
            </Box>

            <Box sx={{ display: isTablet ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    sx={{
                        marginTop: 18,
                        marginBottom: 3,
                        fontSize: isTablet ? 22 : 15,
                        fontWeight: 400,
                    }}
                >
                    Daydream Haven의 Wholesale
                </Typography>
                <Typography
                    sx={{
                        marginTop: 2,
                        fontSize: isTablet ? 17 : 14,
                    }}
                >
                    Daydream Haven과 동행을 원하는 분들을 위한 서비스입니다.
                </Typography>
                <Typography
                    sx={{
                        marginTop: 5,
                        marginBottom: 18,
                        fontSize: isTablet ? 14 : 11,
                        fontFamily: 'Gowun Batang',
                    }}
                >
                    도매회원 가입후 확인 가능합니다.
                </Typography>
            </Box>
            <Box
                onClick={() => navigate(`/${categoryItems[3].toLowerCase()}`)}
                sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    '@media (max-width: 900px)': {
                        width: '100vw',
                        height: '0vh',
                    },
                    '& img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'none',
                        transition: 'filter 0.3s ease-in-out',
                        '&:hover': {
                            filter: 'grayscale(100%)',
                        },
                    },
                    cursor: 'pointer',
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1605882174146-a464b70cf691?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="coffee-delivering"
                />
            </Box>

            <Box sx={{ display: isTablet ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    sx={{
                        marginTop: 18,
                        marginBottom: 3,
                        fontSize: isTablet ? 22 : 15,
                        fontWeight: 400,
                    }}
                >
                    Daydream Haven의 Subscription
                </Typography>
                <Typography
                    sx={{
                        marginTop: 2,
                        fontSize: isTablet ? 17 : 14,
                    }}
                >
                    Daydream Haven의 특별한 원두를 정기적으로 받아볼 수 있는 구독 서비스
                </Typography>
                <Typography
                    onClick={() => navigate(`/${categoryItems[3].toLowerCase()}`)}
                    sx={{
                        marginTop: 5,
                        marginBottom: 18,
                        fontSize: isTablet ? 14 : 11,
                        fontFamily: 'Gowun Batang',
                        cursor: 'pointer',
                    }}
                >
                    자세한 내용은 해당 페이지를 참고하세요.
                </Typography>
            </Box>
        </Box>
    );
};

export default Home;
