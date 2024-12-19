import { useEffect } from 'react';

import { Box, Container, Typography } from '@mui/material';

import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { requiredTerms } from '~/utils/constants';

const Member = () => {
    const { isMobile, isTabletOrMobile } = useResponsiveLayout();

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
            <Box sx={{ pt: isMobile ? 5 : 7, px: isTabletOrMobile ? 0 : 1, mb: 30 }}>
                <Typography
                    sx={{
                        fontSize: 25,
                        mt: 10,
                        mb: 6,
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
