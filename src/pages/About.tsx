import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const About = () => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box sx={{ paddingTop: 12, paddingX: isTablet ? 0 : 15, marginTop: 10 }}>
            <Typography
                sx={{
                    fontSize: 30,
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 2,
                    paddingX: { xs: 3, sm: 3, md: 2 },
                }}
            >
                Daydream Haven
            </Typography>
            <Typography
                sx={{
                    fontSize: 18,
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 15,
                    paddingX: { xs: 3, sm: 3, md: 2 },
                }}
            >
                몽상가의 안식처
            </Typography>

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
                    src="https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="daydream"
                />
            </Box>
            <Typography
                sx={{
                    fontFamily: 'Gowun Batang',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 50,
                    marginBottom: 10,
                    paddingX: { xs: 5, sm: 15, md: 2 },
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
                    marginTop: 10,
                    marginBottom: 60,
                    marginRight: 5,
                    paddingX: { xs: 5, sm: 15, md: 2 },
                }}
            >
                {`영화 '환상의 빛' 중에서`}
            </Typography>
            <Grid
                container
                spacing={{ xs: 3, md: 2 }}
                sx={{ marginY: 30, alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Typography
                        sx={{
                            marginTop: 2,
                            marginBottom: 5,
                            paddingX: { xs: 10, sm: 15, md: 8, lg: 12, xl: 16 },
                            lineHeight: 1.8,
                        }}
                    >
                        우리에겐 가끔 몽상에 빠져 허우적될 시간이 필요합니다. 우리는 이미 너무 많은 것을 잃고 있습니다.
                        우리의 자아는 충전의 시간이 필요합니다. 오후의 햇살을 맞으며 잠시 우리의 머리를 식힐 필요가
                        있습니다.
                    </Typography>
                    <Typography
                        sx={{
                            marginTop: 2,
                            marginBottom: 10,
                            paddingX: { xs: 10, sm: 15, md: 8, lg: 12, xl: 16 },
                            lineHeight: 1.8,
                        }}
                    >
                        커피 한 잔으로 평온함을 얻음과 동시에 자유로운 상상의 숲속으로 들어갈 수 있습니다. 우리는 자유의
                        숲을 거닐며 마음의 안식과 평화를 찾을 수 있습니다. 꿈을 꾸며 더 나은 삶을 갈구할 수 있습니다.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 10 }}>
                        <Divider
                            sx={{
                                width: '50%',
                            }}
                        />
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: 'Gowun Batang',
                            marginTop: 2,
                            marginBottom: 7,
                            paddingX: { xs: 10, sm: 15, md: 8, lg: 12, xl: 16 },
                            lineHeight: 1.8,
                        }}
                    >
                        {`우리는 꿈을 꿔야 한다. 우리는 꿈을 가진 아이들로서 자라났지만, 이제 우리는 어른과 국가처럼 너무 불순해졌다. 우리는 꿈꾸기를 그만뒀다. 우리는 항상 꿈을 가져야만 한다. - 허브 브룩스`}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: 'Gowun Batang',
                            marginTop: 2,
                            marginBottom: 15,
                            paddingX: { xs: 10, sm: 15, md: 8, lg: 12, xl: 16 },
                            lineHeight: 1.8,
                        }}
                    >
                        {`We should be dreaming. We grew up as kids having dreams, but now we're too sophisticated as
                        adults, as a nation. We stopped dreaning. We should always have dreams.`}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
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
                            src="https://images.unsplash.com/photo-1588406320565-9fa6d9901d1d?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="sunshine"
                        />
                    </Box>
                </Grid>
            </Grid>

            <Grid
                container
                spacing={{ xs: 3, md: 2 }}
                sx={{ marginBottom: 20 }}
                alignItems={'flex-end'}
                justifyContent={'flex-start'}
            >
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
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
                            src="https://images.unsplash.com/photo-1550731358-491ded4af838?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="coffee-hand"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 10,
                            marginBottom: 5,
                            paddingX: { xs: 10, sm: 15, md: 8, lg: 12, xl: 16 },
                            lineHeight: 1.8,
                        }}
                    >
                        Daydream Haven은 커피를 통해 모든 이들의 쉼을 응원합니다. 나아가 자유로운 몽상을 할 수 있기를
                        바랍니다. 커피가 주는 작은 행복이 개인의 삶에 힘이 되고 스스로 꿈꿀 수 있는 삶을 살 수 있기를
                        바랍니다.
                    </Typography>

                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 2,
                            marginBottom: 5,
                            paddingX: { xs: 10, sm: 15, md: 8, lg: 12, xl: 16 },
                            lineHeight: 1.8,
                        }}
                    >
                        그것이 Daydream Haven이 추구하는 커피입니다.
                    </Typography>
                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 2,
                            marginBottom: 5,
                            paddingX: { xs: 10, sm: 15, md: 8, lg: 12, xl: 16 },
                            lineHeight: 1.8,
                        }}
                    >
                        Daydream Haven 커피를 통해 자유롭고 행복한 몽상에 빠져 자신의 자아를 치유할 수 있기를 간절히
                        바라봅니다.
                    </Typography>
                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 2,
                            marginBottom: 15,
                            paddingX: { xs: 10, sm: 15, md: 8, lg: 12, xl: 16 },
                            lineHeight: 1.8,
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
                            fontSize: 30,
                            marginTop: 2,
                            marginBottom: 15,
                            paddingX: { xs: 10, sm: 15, md: 8, lg: 12, xl: 16 },
                            lineHeight: 1.8,
                        }}
                    >
                        Daydream Haven
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default About;
