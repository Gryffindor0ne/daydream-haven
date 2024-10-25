import { useEffect } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';
import { requiredTerms } from '~/utils/constants';

const Member = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { id } = useCurrentPathAndId();
    const getContent = () => {
        const termType = id === 'agreement' ? 'termsOfUse' : 'privacyPolicy';
        return requiredTerms.find((item) => item.name === termType)?.content;
    };

    useEffect(() => {
        window.scrollTo(0, 0); // 스크롤 맨 위로 이동
    }, [id]);

    return (
        <Container maxWidth="lg">
            <Box sx={{ paddingTop: 10, paddingX: isMobile ? 0 : 15, marginBottom: 30 }}>
                <Typography
                    sx={{
                        fontSize: 25,
                        marginTop: 10,
                        marginBottom: 6,
                        ml: 2,
                    }}
                >
                    {id === 'agreement' ? '이용약관' : '개인정보 처리방침'}
                </Typography>
                <Box sx={{ width: '100%' }}>
                    <Typography
                        sx={{
                            fontSize: 12,
                            whiteSpace: 'pre-line',
                            p: 2,
                            background: '#F4EDCC',
                        }}
                    >
                        {getContent()}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Member;
