import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import BasicPopup from '~/components/layout/popup/BasicPopup';
import { useAppDispatch } from '~/app/reduxHooks';
import { setAuthenticated, setLoading } from '~/features/auth/authSlice';
import { setAccessTokenCookie } from '~/utils/cookiesUtils';
import useScrollToTop from '~/hooks/useScrollToTop';
import getLoginToken from '~/api/getLoginTokenAPI';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('유효한 이메일 주소를 입력하세요.').required('이메일을 입력해주세요.'),
    password: Yup.string().required('비밀번호를 입력해주세요.'),
});

export type LoginInfo = {
    email: string;
    password: string;
};

const Login = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const location = useLocation();

    const queryPath = location?.search?.replace('?redirectedFrom=', '/');
    const from = queryPath || location?.state?.redirectedFrom?.pathname || '/';
    const errorMessage = '이메일, 비밀번호가 맞지 않습니다. 다시 시도해주세요.';

    const buttonHeight = isMobile ? 45 : 60;
    const buttonFontSize = 16;

    const login = async (email: string, password: string) => {
        dispatch(setLoading(true));
        try {
            const response = await getLoginToken({ email, password });
            if (response.status === 201) {
                setAccessTokenCookie(response.data.access_token);
                dispatch(setAuthenticated(true));
                navigate(from);
            }
        } catch (error) {
            setMessage(errorMessage);
            setIsOpen(true);
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleSubmit = (values: LoginInfo) => {
        login(values.email, values.password);
    };

    const handleGuestLogin = () => {
        login(import.meta.env.VITE_GUEST_EMAIL, import.meta.env.VITE_GUEST_PASSWORD);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    useScrollToTop();

    return (
        <Container maxWidth="sm">
            {isOpen && <BasicPopup open={isOpen} onClose={handleClose} message={message} />}

            <Box sx={{ minHeight: '100vh', pt: isMobile ? 5 : 20, mt: 10, mb: 5 }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontFamily: 'Fraunces',
                                fontWeight: 700,
                                fontSize: isMobile ? 25 : 36,
                                color: '#191919',
                                marginBottom: 6,
                            }}
                            align="center"
                            gutterBottom
                        >
                            로그인
                        </Typography>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={loginSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                name="email"
                                                label="이메일"
                                                variant="outlined"
                                                fullWidth
                                                size={isMobile ? 'small' : 'large'}
                                                error={errors.email && touched.email}
                                                helperText={errors.email && touched.email ? errors.email : ''}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                type="password"
                                                name="password"
                                                label="비밀번호"
                                                variant="outlined"
                                                fullWidth
                                                size={isMobile ? 'small' : 'large'}
                                                error={errors.password && touched.password}
                                                helperText={errors.password && touched.password ? errors.password : ''}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                sx={{
                                                    height: buttonHeight,
                                                    fontSize: buttonFontSize,
                                                    '&:hover': {
                                                        color: '#ffffff',
                                                        background: '#B67352',
                                                    },
                                                }}
                                            >
                                                로그인
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 3 }}>
                                <Divider
                                    sx={{
                                        width: '90%',
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={() => navigate(`/register`)}
                                variant="outlined"
                                color="primary"
                                fullWidth
                                sx={{
                                    height: buttonHeight,
                                    fontSize: buttonFontSize,
                                    '&:hover': {
                                        color: '#B67352',
                                        background: '#ffffff',
                                    },
                                }}
                            >
                                회원가입
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                onClick={handleGuestLogin}
                                sx={{
                                    fontWeight: 400,
                                    fontSize: 18,
                                    marginY: 7,
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#B67352',
                                    },
                                }}
                                align="center"
                            >
                                게스트 로그인
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Login;
