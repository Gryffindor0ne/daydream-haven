import { useEffect } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const About = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const commonLayoutStyle = {
        display: 'flex',
        justifyContent: 'center',
    };

    const commonTextStyle = {
        fontSize: isMobile ? 10 : 15,
        px: 6,
        lineHeight: 1.8,
        mt: 2,
    };

    const ImageBoxStyle = {
        maxWidth: '100%',
        height: 'auto',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center', // 이미지 중심을 기준으로 잘라내기
        },
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 스크롤을 맨 위로 이동
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container maxWidth="xl">
            <Box sx={{ pt: 10, mt: isTabletOrMobile ? 0 : 10 }}>
                <Typography
                    sx={{
                        ...commonLayoutStyle,
                        fontFamily: 'Gowun Batang',
                        fontWeight: 700,
                        fontSize: isMobile ? 30 : 55,
                        mt: 10,
                        mb: 2,
                    }}
                >
                    Daydream Haven
                </Typography>
                <Typography
                    sx={{
                        ...commonLayoutStyle,
                        fontFamily: 'Gowun Batang',
                        fontSize: isMobile ? 15 : 22,
                        mb: 15,
                        paddingX: { xs: 3, md: 2 },
                    }}
                >
                    몽상가의 안식처
                </Typography>

                <Box
                    sx={{
                        ...ImageBoxStyle,
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1472067662551-b6bc9eb3091a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="daydream"
                        loading="lazy"
                    />
                </Box>
                <Typography
                    sx={{
                        ...commonLayoutStyle,
                        fontFamily: 'Gowun Batang',
                        fontSize: isMobile ? 10 : 18,
                        mt: isMobile ? 10 : 50,
                        mb: isMobile ? 0 : 10,
                        px: { xs: 5, md: 10 },
                    }}
                >
                    {
                        '"아버지가 전에는 배를 탔었는데, 홀로 바다 위에 있으면 저 멀리 아름다운 빛이 보였대. 반짝반짝 빛나면서 아버지를 끌어당겼대."'
                    }
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Gowun Batang',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        fontSize: isMobile ? 10 : 15,
                        mt: 10,
                        mb: isMobile ? 15 : 60,
                        mr: isMobile ? 2 : 10,
                        px: { xs: 5, md: 2 },
                    }}
                >
                    {`영화 '환상의 빛' 중`}
                </Typography>
                <Grid
                    container
                    spacing={{ xs: 3, md: 2 }}
                    sx={{ mb: isMobile ? 10 : 30, alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Typography
                            sx={{
                                ...commonTextStyle,
                                mb: 5,
                            }}
                        >
                            우리에겐 가끔 몽상에 빠져 허우적될 시간이 필요합니다. 우리는 순간 순간 많은 것에 지쳐가고
                            있습니다.
                            <br></br> 우리의 자아는 충전의 시간이 필요합니다. 오후의 햇살을 맞으며 잠시 우리의 머리를
                            식힐 필요가 있습니다.
                        </Typography>
                        <Typography
                            sx={{
                                ...commonTextStyle,
                                mb: 10,
                            }}
                        >
                            커피 한 잔으로 평온함을 얻음과 동시에 자유로운 상상의 숲속으로 들어갈 수 있습니다. <br></br>{' '}
                            우리는 자유의 숲을 거닐며 마음의 안식과 평화를 찾을 수 있습니다. 꿈을 꾸며 더 나은 삶을
                            갈구할 수 있습니다.
                        </Typography>
                        <Box sx={{ ...commonLayoutStyle, my: 10 }}>
                            <Divider
                                sx={{
                                    width: '50%',
                                }}
                            />
                        </Box>
                        <Typography
                            sx={{
                                fontFamily: 'Gowun Batang',
                                ...commonTextStyle,
                            }}
                        >
                            {`우리는 꿈을 꿔야 한다. 우리는 꿈을 가진 아이들로서 자라났지만, 이제 우리는 어른과 국가처럼 너무 불순해졌다. 우리는 꿈꾸기를 그만뒀다. 우리는 항상 꿈을 가져야만 한다.`}
                        </Typography>
                        <Typography
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                fontFamily: 'Gowun Batang',
                                ...commonTextStyle,
                                mb: 6,
                                mr: 2,
                            }}
                        >
                            {`- 허브 브룩스`}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: 'Gowun Batang',
                                ...commonTextStyle,
                                mb: isMobile ? 0 : 15,
                            }}
                        >
                            {`We should be dreaming. We grew up as kids having dreams, but now we're too sophisticated as
                        adults, as a nation. We stopped dreaning. We should always have dreams.`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        {!isTabletOrMobile && (
                            <Box
                                sx={{
                                    ...commonLayoutStyle,
                                    ...ImageBoxStyle,
                                    width: '90%',
                                    aspectRatio: '5 / 6', // 가로:세로 비율 설정
                                    overflow: 'hidden',
                                    position: 'relative',
                                    ml: 'auto',
                                }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1588406320565-9fa6d9901d1d?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="sunshine"
                                    loading="lazy"
                                />
                            </Box>
                        )}
                    </Grid>
                </Grid>

                <Grid container spacing={{ xs: 3, md: 2 }} sx={{ mb: 20 }}>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Box
                            sx={{
                                ...commonLayoutStyle,
                                ...ImageBoxStyle,
                                width: '100%',
                                aspectRatio: '5 / 6', // 가로:세로 비율 설정
                                overflow: 'hidden',
                                position: 'relative',
                                maxWidth: { xs: '80%', lg: '100%' },
                                margin: '0 auto', // 가운데 정렬
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1550731358-491ded4af838?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="coffee-hand"
                                loading="lazy"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Typography
                            sx={{
                                ...commonLayoutStyle,
                                ...commonTextStyle,
                                mt: 5,
                                mb: 2,
                            }}
                        >
                            Daydream Haven은 모든 이들의 쉼을 응원합니다.
                        </Typography>
                        <Typography
                            sx={{
                                ...commonLayoutStyle,
                                ...commonTextStyle,
                                mb: 2,
                            }}
                        >
                            나아가 자유로운 몽상을 할 수 있기를 바랍니다.
                        </Typography>

                        <Typography
                            sx={{
                                ...commonLayoutStyle,
                                ...commonTextStyle,
                                mb: 30,
                            }}
                        >
                            커피를 통해 지친 자아를 치유할 수 있기를 간절히 바라봅니다.
                        </Typography>
                        <Typography
                            sx={{
                                ...commonLayoutStyle,
                                ...commonTextStyle,
                                fontFamily: 'Gowun Batang',
                                fontSize: isMobile ? 16 : 22,
                                mb: 35,
                            }}
                        >
                            모두 평안하기를.
                        </Typography>
                        <Typography
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                fontFamily: 'Dancing Script',
                                fontWeight: 400,
                                fontSize: isMobile ? 20 : 30,
                                mb: 10,
                                mt: 2,
                                px: { xs: 5, md: 8, lg: 12, xl: 16 },
                                lineHeight: 1.8,
                            }}
                        >
                            Daydream Haven
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default About;
