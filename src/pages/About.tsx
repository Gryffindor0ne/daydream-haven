import { Container, Box, Typography, Grid, Divider, SxProps, Theme } from '@mui/material';

import useScrollToTop from '~/hooks/useScrollToTop';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';

// Types
type BaseTextProps = {
    text: string;
    sx?: SxProps<Theme>;
};

type TextListProps = {
    texts: string[];
    sx?: SxProps<Theme>;
};

// Style constants
const createStyles = (isMobile: boolean) => ({
    container: {
        pt: 10,
        mt: { xs: 0, md: 10 },
    },
    commonLayout: {
        display: 'flex',
        justifyContent: 'center',
    },
    commonText: {
        fontSize: isMobile ? 12 : 18,
        px: 6,
        lineHeight: 1.8,
        mb: 0.5,
    },
    imageBox: {
        maxWidth: '100%',
        height: 'auto',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
        },
    },
});

// textitem 컴포넌트
const TextItem: React.FC<BaseTextProps> = ({ text, sx = {} }) => <Typography sx={sx}>{text}</Typography>;

// textlist 컴포넌트
const TextList: React.FC<TextListProps> = ({ texts, sx = {} }) => (
    <>
        {texts.map((text, index) => (
            <TextItem key={index} text={text} sx={sx} />
        ))}
    </>
);

const About = () => {
    const { isTabletOrMobile, isMobile } = useResponsiveLayout();
    const styles = createStyles(isMobile);

    const textItems = [
        '우리에겐 가끔 몽상에 빠져 허우적될 시간이 필요합니다.',
        '우리는 순간 순간 많은 것에 지쳐가고 있습니다.',
        '우리의 자아는 충전의 시간이 필요합니다.',
        '오후의 햇살을 맞으며 잠시 우리의 머리를 식힐 필요가 있습니다.',
        '커피 한 잔으로 평온함을 얻음과 동시에 자유로운 상상의 숲속으로 들어갈 수 있습니다.',
        '꿈을 꾸며 더 나은 삶을 갈구할 수 있습니다.',
    ];

    const textItems2 = [
        'Daydream Haven은 모든 이들의 쉼을 응원합니다.',
        '나아가 자유로운 몽상을 할 수 있기를 바랍니다.',
        '커피를 통해 지친 자아를 치유할 수 있기를 간절히 바라봅니다.',
    ];

    useScrollToTop();

    return (
        <Container maxWidth="xl">
            <Box sx={styles.container}>
                {/* 제목 섹션 */}
                <TextItem
                    text="Daydream Haven"
                    sx={{
                        ...styles.commonLayout,
                        fontFamily: 'Gowun Batang',
                        fontWeight: 700,
                        fontSize: isMobile ? 30 : 55,
                        mt: 10,
                        mb: 2,
                    }}
                />

                <TextItem
                    text="몽상가의 안식처"
                    sx={{
                        ...styles.commonLayout,
                        fontFamily: 'Gowun Batang',
                        fontSize: isMobile ? 15 : 22,
                        mb: 15,
                        px: { xs: 3, md: 2 },
                    }}
                />

                {/* 메인이미지 섹션 */}
                <Box component="figure" sx={styles.imageBox}>
                    <img
                        src="https://images.unsplash.com/photo-1472067662551-b6bc9eb3091a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="daydream"
                        loading="lazy"
                    />
                </Box>

                {/* 인용문 섹션 */}
                <TextItem
                    text='"아버지가 전에는 배를 탔었는데, 홀로 바다 위에 있으면 저 멀리 아름다운 빛이 보였대. 반짝반짝 빛나면서 아버지를 끌어당겼대."'
                    sx={{
                        ...styles.commonLayout,
                        fontFamily: 'Gowun Batang',
                        fontSize: isMobile ? 13 : 18,
                        mt: isMobile ? 10 : 50,
                        mb: isMobile ? 0 : 10,
                        px: { xs: 5, md: 10 },
                    }}
                />
                <TextItem
                    text='"영화 `환상의 빛` 중 "'
                    sx={{
                        ...styles.commonLayout,

                        justifyContent: 'flex-end',
                        fontFamily: 'Gowun Batang',
                        fontSize: isMobile ? 11 : 15,
                        mt: 10,
                        mb: isMobile ? 15 : 60,
                        mr: isMobile ? 2 : 10,
                        px: { xs: 5, md: 2 },
                    }}
                />

                {/* 메인컨텐츠 섹션 */}
                <Grid
                    container
                    spacing={{ xs: 3, md: 2 }}
                    sx={{ mb: isMobile ? 10 : 30, alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <Grid item xs={12} lg={6}>
                        <TextList texts={textItems} sx={styles.commonText} />

                        <Box sx={{ ...styles.commonLayout, my: isMobile ? 5 : 10 }}>
                            <Divider sx={{ width: '50%' }} />
                        </Box>

                        <TextItem
                            text='"우리는 꿈을 꿔야 한다. 우리는 꿈을 가진 아이들로서 자라났지만, 이제 우리는 어른과 국가처럼 너무 불순해졌다. 우리는 꿈꾸기를 그만뒀다. 우리는 항상 꿈을 가져야만 한다."'
                            sx={{
                                ...styles.commonText,
                                fontFamily: 'Gowun Batang',
                            }}
                        />
                        <TextItem
                            text="- 허브 브룩스"
                            sx={{
                                ...styles.commonText,
                                display: 'flex',
                                justifyContent: 'flex-end',
                                fontFamily: 'Gowun Batang',
                                mb: 6,
                                mr: 2,
                            }}
                        />
                        <TextItem
                            text="'We should be dreaming. We grew up as kids having dreams, but now we're too sophisticated as
                        adults, as a nation. We stopped dreaning. We should always have dreams.'"
                            sx={{
                                ...styles.commonText,
                                fontFamily: 'Gowun Batang',
                                mb: isMobile ? 0 : 15,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        {!isTabletOrMobile && (
                            <Box
                                sx={{
                                    ...styles.imageBox,
                                    ...styles.commonLayout,
                                    width: '90%',
                                    aspectRatio: '5/6',
                                    overflow: 'hidden',
                                    ml: 'auto',
                                }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1588406320565-9fa6d9901d1d"
                                    alt="sunshine"
                                    loading="lazy"
                                />
                            </Box>
                        )}
                    </Grid>
                </Grid>

                <Grid container spacing={{ xs: 3, md: 2 }} sx={{ mb: 20 }}>
                    <Grid item xs={12} lg={6}>
                        <Box
                            sx={{
                                ...styles.imageBox,
                                ...styles.commonLayout,
                                width: '100%',
                                aspectRatio: '5 / 6', // 가로:세로 비율 설정
                                overflow: 'hidden',
                                position: 'relative',
                                maxWidth: { xs: '80%', lg: '100%' },
                                m: '0 auto', // 가운데 정렬
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1550731358-491ded4af838"
                                alt="coffee-hand"
                                loading="lazy"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <TextList texts={textItems2} sx={{ ...styles.commonText, ...styles.commonLayout }} />

                        <Typography
                            sx={{
                                ...styles.commonLayout,
                                ...styles.commonText,
                                fontFamily: 'Gowun Batang',
                                fontSize: isMobile ? 16 : 22,
                                my: isMobile ? 30 : 40,
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
