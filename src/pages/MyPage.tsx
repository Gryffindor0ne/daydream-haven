import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/app/reduxHooks';
import useScrollToTop from '~/hooks/useScrollToTop';
import { UserInfoProps } from '~/components/order/OrdererInfo';
import { useEffect, useState } from 'react';
import useFetchUserInfo from '~/hooks/useFetchUserInfo';
import { setLoading } from '~/features/auth/authSlice';

const MyPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useScrollToTop();

    const [userInfo, setUserInfo] = useState<UserInfoProps>();
    useFetchUserInfo({ setUserInfo });

    useEffect(() => {
        dispatch(setLoading(!userInfo));
    }, [dispatch, userInfo]);

    return (
        <Container maxWidth="lg" sx={{ minHeight: 1400 }}>
            {userInfo && (
                <Box sx={{ pt: 25, px: isMobile ? 0 : 15, mb: 30 }}>
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

                    <Box sx={{ pt: 5 }}>
                        <Typography sx={{ fontSize: 20, fontFamily: 'Gowun Batang', display: 'flex' }}>
                            안녕하세요,
                            <Box
                                component="span"
                                sx={{ fontSize: 20, fontFamily: 'Gowun Batang', fontWeight: 600, mx: 1 }}
                            >
                                {userInfo?.name}
                            </Box>
                            님
                        </Typography>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default MyPage;
