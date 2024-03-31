import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Checkbox, FormControlLabel } from '@mui/material';

import { requiredTerms } from '~/utils/constants';
import { axiosInstance } from '~/lib/axiosInstance';
import BasicAlert from '~/components/BasicAlert';

type RegisterInfo = {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    phoneNumber: string;
    termsAgreed: boolean[];
    marketingTermsAgreed: boolean;
};

const registerSchema = Yup.object().shape({
    email: Yup.string().email('유효한 이메일 주소를 입력하세요.').required('이메일은 필수 입력 항목입니다.'),
    password: Yup.string()
        .required('비밀번호는 필수 입력 항목입니다.')
        .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
        .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            '최소 8자, 대문자 또는 소문자 중 하나, 숫자, 특수 문자(@$!%*?&)를 포함해야 합니다.',
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다.')
        .required('비밀번호 확인은 필수 입력 항목입니다.'),
    username: Yup.string()
        .matches(/^[가-힣]{2,5}$/, '한글로 입력해주세요.')
        .min(2, '2글자 이상 5글자 이하로 입력해주세요')
        .max(4, '2글자 이상 5글자 이하로 입력해주세요')
        .required('이름은 필수 입력 항목입니다.'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, '전화번호는 숫자로만 입력해야 합니다.')
        .length(11, '전화번호는 11자리여야 합니다.')
        .required('전화번호는 필수 입력 항목입니다.'),
    termsAgreed: Yup.array()
        .of(Yup.boolean())
        .test('termsAgreed', '모든 필수 약관에 동의해야 합니다.', (value) => value?.every((item) => item === true)),

    marketingTermsAgreed: Yup.boolean(), // 선택적 약관에 대한 유효성 검사 필요 없음
});

const Register = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = async (values: RegisterInfo) => {
        try {
            const response = await axiosInstance.post(`/users/registration`, {
                email: values.email,
                password: values.password,
                name: values.username,
                phoneNumber: values.phoneNumber,
                marketingTermsAgreed: values.marketingTermsAgreed,
            });
            if (response.status === 201) {
                setIsOpen(true);
                setIsSuccess(true);
                setMessage('회원가입이 완료되었습니다.');
            }
        } catch (error) {
            setIsOpen(true);
            setMessage('동일한 이메일이 존재합니다.');
            console.log(error);
        }
    };

    useEffect(() => {
        setIsSuccess(false);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        if (isSuccess) {
            navigate(`/login`);
        }
    };

    const [allTermsAgreed, setAllTermsAgreed] = useState(false);

    return (
        <Container maxWidth="sm">
            {isOpen && <BasicAlert open={isOpen} onClose={handleClose} message={message} />}

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
                        <Typography variant="h5" align="center" gutterBottom sx={{ marginBottom: 5 }}>
                            회원가입
                        </Typography>

                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                                confirmPassword: '',
                                username: '',
                                phoneNumber: '',
                                termsAgreed: requiredTerms.map(() => false), // 초기값: 모두 false
                                marketingTermsAgreed: false, // 선택적 약관에 대한 동의 상태
                            }}
                            validationSchema={registerSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, values, setFieldValue }) => {
                                return (
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
                                                    helperText={
                                                        errors.password && touched.password ? errors.password : ''
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    as={TextField}
                                                    type="password"
                                                    name="confirmPassword"
                                                    label="비밀번호 확인"
                                                    variant="outlined"
                                                    fullWidth
                                                    error={errors.confirmPassword && touched.confirmPassword}
                                                    helperText={
                                                        errors.confirmPassword && touched.confirmPassword
                                                            ? errors.confirmPassword
                                                            : ''
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    as={TextField}
                                                    name="username"
                                                    label="이름"
                                                    variant="outlined"
                                                    fullWidth
                                                    error={errors.username && touched.username}
                                                    helperText={
                                                        errors.username && touched.username ? errors.username : ''
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    as={TextField}
                                                    name="phoneNumber"
                                                    label="휴대폰 번호"
                                                    variant="outlined"
                                                    fullWidth
                                                    error={errors.phoneNumber && touched.phoneNumber}
                                                    helperText={
                                                        errors.phoneNumber && touched.phoneNumber
                                                            ? errors.phoneNumber
                                                            : ''
                                                    }
                                                />
                                            </Grid>
                                            {/* 필수 약관 전체 동의 체크박스 */}
                                            <Grid item xs={12} sx={{ marginTop: 3 }}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            size="medium"
                                                            checked={allTermsAgreed}
                                                            onChange={(event) => {
                                                                const isChecked = event.target.checked;
                                                                setAllTermsAgreed(isChecked);

                                                                // 약관에 대한 동의 상태를 모두 변경
                                                                if (isChecked) {
                                                                    setFieldValue(
                                                                        'termsAgreed',
                                                                        Array(requiredTerms.length).fill(true),
                                                                    );
                                                                    // 선택 약관에 대한 동의도 변경
                                                                    setFieldValue('marketingTermsAgreed', true);
                                                                } else {
                                                                    setFieldValue(
                                                                        'termsAgreed',
                                                                        Array(requiredTerms.length).fill(false),
                                                                    );
                                                                    // 선택 약관에 대한 동의도 변경
                                                                    setFieldValue('marketingTermsAgreed', false);
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label="모든 약관에 동의합니다."
                                                />
                                            </Grid>
                                            {requiredTerms.map((term, index) => (
                                                <Grid item xs={12} key={index}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                size="small"
                                                                checked={values.termsAgreed[index]}
                                                                onChange={(event) => {
                                                                    if (!event.target.checked) {
                                                                        setAllTermsAgreed(false);
                                                                    }
                                                                    setFieldValue(
                                                                        `termsAgreed.${index}`,
                                                                        event.target.checked,
                                                                    );
                                                                }}
                                                            />
                                                        }
                                                        label={term.label}
                                                    />
                                                    <Box
                                                        sx={{ width: '100%', maxHeight: 100, overflowY: 'auto', my: 1 }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: 12,
                                                                whiteSpace: 'pre-line',
                                                                p: 2,
                                                                background: '#F4EDCC',
                                                            }}
                                                        >
                                                            {term.content}
                                                        </Typography>
                                                    </Box>
                                                    {!allTermsAgreed && (
                                                        <Grid item xs={12}>
                                                            <Box sx={{ color: 'red', fontSize: 12 }}>
                                                                <ErrorMessage
                                                                    name={`termsAgreed`}
                                                                    component="div"
                                                                    className="error"
                                                                />
                                                            </Box>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                            ))}
                                            {/* 선택 약관에 대한 체크박스 */}
                                            <Grid item xs={12} sx={{ my: 1 }}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            size="small"
                                                            checked={values.marketingTermsAgreed}
                                                            onChange={(event) => {
                                                                if (!event.target.checked) {
                                                                    setAllTermsAgreed(false);
                                                                }
                                                                setFieldValue(
                                                                    'marketingTermsAgreed',
                                                                    event.target.checked,
                                                                );
                                                            }}
                                                        />
                                                    }
                                                    label="SMS 및 이메일 수신 동의 (선택)"
                                                />
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        maxHeight: 100,
                                                        overflowY: 'auto',
                                                        my: 1,
                                                        p: 2,
                                                        background: '#F4EDCC',
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: 12, whiteSpace: 'pre-line' }}>
                                                        {` 할인쿠폰 및 혜택, 이벤트, 신상품 소식 등 쇼핑몰에서 제공하는 유익한 쇼핑정보를 SMS나 이메일로 받아보실 수 있습니다.

                                                        단, 주문/거래 정보 및 주요 정책과 관련된 내용은 수신동의 여부와 관계없이 발송됩니다. 

                                                        선택 약관에 동의하지 않으셔도 회원가입은 가능하며, 회원가입 후 회원정보수정 페이지에서 언제든지 수신여부를 변경하실 수 있습니다. `}
                                                    </Typography>
                                                </Box>
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
                                                        marginBottom: 20,
                                                        '&:hover': {
                                                            color: '#ffffff',
                                                            background: '#B67352',
                                                        },
                                                    }}
                                                >
                                                    회원 가입하기
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Register;
