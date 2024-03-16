import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('유효한 이메일 주소를 입력하세요.').required('이메일을 입력해주세요.'),
    password: Yup.string().required('비밀번호를 입력해주세요.'),
});

type LoginInfo = {
    email: string;
    password: string;
};

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (values: LoginInfo) => {
        console.log(values);
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ minHeight: '75vh', paddingTop: 20, marginTop: 10, marginBottom: 5 }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontFamily: 'Fraunces',
                                fontWeight: 700,
                                fontSize: 36,
                                color: '#191919',
                                marginBottom: 6,
                            }}
                            align="center"
                            gutterBottom
                        >
                            Daydream Haven
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
                                                    height: 60,
                                                    fontSize: 16,
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
                                    height: 60,
                                    fontSize: 16,
                                    '&:hover': {
                                        color: '#B67352',
                                        background: '#ffffff',
                                    },
                                }}
                            >
                                회원가입
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Login;
