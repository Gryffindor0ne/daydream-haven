import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/app/reduxHooks';

const MyPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    return (
        <Container maxWidth="lg" sx={{ minHeight: 1250 }}>
            <Box sx={{ pt: 20, px: isMobile ? 0 : 15, mb: 30 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                        sx={{
                            fontSize: 25,
                        }}
                    >
                        마이 페이지
                    </Typography>
                    <Button
                        onClick={() => {
                            dispatch({ type: 'auth/logoutUser' });
                            navigate(`/`);
                        }}
                        sx={{
                            color: '#503C3C',
                            fontFamily: 'Merriweather',
                            fontWeight: 400,
                            fontSize: 14,
                            background: '#F4EDCC',
                        }}
                    >
                        로그아웃
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default MyPage;
