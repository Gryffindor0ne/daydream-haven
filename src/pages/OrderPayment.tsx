import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import PortOne from '@portone/browser-sdk/v2';

import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import { Box, Container, styled } from '@mui/system';

import { useAppDispatch, useAppSelector } from '~/app/reduxHooks';
import { orderState } from '~/features/order/orderSlice';
import { paymentSuccess } from '~/features/payment/paymentSlice';
import { setLoading } from '~/features/auth/authSlice';
import AddressSearchForm from '~/components/location/AddressSeacrchForm';
import OrderItem from '~/components/order/OrderItem';
import OrdererInfo from '~/components/order/OrdererInfo';

import { axiosInstance } from '~/lib/axiosInstance';

import useScrollToTop from '~/hooks/useScrollToTop';
import useFetchUserInfo from '~/hooks/useFetchUserInfo';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { paymentMethods } from '~/utils/constants';
import { extractAccessTokenFromCookie } from '~/utils/cookiesUtils';
import { formatNumber } from '~/utils/number';
import { AddressProps, OrderItemProps, OrderProps } from '~/types/order';
import { UserInfoProps } from '~/types/user';

// 주문결제 페이지 배경색 설정
const OrderPaymentPaper = styled(Paper)(() => ({
    backgroundColor: '#EEEDEB',
}));

const orderSchema = Yup.object().shape({
    address: Yup.string().required('주소는 필수 입력 항목입니다.'),
    additionalAddress: Yup.string().required('상세주소는 필수 입력 항목입니다.'),
    selectedPaymentMethod: Yup.string().oneOf(['카드결제', '실시간 계좌이체', '무통장입금']),
    orderer: Yup.string().test('required-if-payment-method', '주문자명은 필수 입력 항목입니다.', function (value) {
        const selectedPaymentMethod = this.resolve(Yup.ref('selectedPaymentMethod'));
        if (selectedPaymentMethod === '무통장입금') {
            return !!value;
        }
        return true;
    }),
    cashReceipt: Yup.boolean(),
    issuanceTargetNumber: Yup.string()
        .test('required-if-cashReceipt', '전화번호 혹은 사업자번호를 입력하세요.', function (value) {
            const cashReceipt = this.resolve(Yup.ref('cashReceipt'));
            if (cashReceipt) {
                return !!value;
            }
            return true;
        })
        .matches(/^[0-9]+$/, '숫자를 입력하세요.'),

    paymentAgreed: Yup.boolean().oneOf([true], '전체 동의를 하셔야 결제 가능합니다.'),
});

const OrderPayment = () => {
    const { orderItems, subTotal, deliveryFee, totalAmount } = useAppSelector(orderState);
    const dispatch = useAppDispatch();
    const accessToken = extractAccessTokenFromCookie();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfoProps>();
    const { isMobile } = useResponsiveLayout();

    useFetchUserInfo({ setUserInfo });

    useScrollToTop();

    useEffect(() => {
        if (orderItems.length === 0) {
            // 카트에 아이템이 없으면 카트 페이지로 리디렉션
            navigate('/cart');
        }
        dispatch(setLoading(!userInfo));
    }, [navigate, orderItems, userInfo, dispatch]);

    const orderProductsList: OrderItemProps[] = orderItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        grindSize: item.grindSize,
        capacity: item.capacity,
        period: item.period ?? undefined,
    }));

    const handleSubmit = async (values: OrderProps) => {
        // 주문 접수 api 연결
        try {
            const { data } = await axiosInstance.post(
                `/orders`,
                {
                    items: orderProductsList,
                    paymentInfo: {
                        paymentMethod: paymentMethods[values.selectedPaymentMethod],
                        cashReceiptRequired: values.cashReceipt,
                        issuanceNumber: values.issuanceTargetNumber,
                        cashReceiptRecipientName: values.orderer,
                        accountHolderName: values.orderer,
                    },
                    deliveryInfo: {
                        name: userInfo!.name,
                        address: values.address,
                        addressDetail: values.additionalAddress,
                        postcode: values.postcode,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            //포트원 가상결제 요청

            if (data.id) {
                if (data.paymentInfo.paymentMethod !== 'deposit_without_bankbook') {
                    const response = await PortOne.requestPayment({
                        // Store ID 설정
                        storeId: `${import.meta.env.VITE_PORTONE_STORE_ID}`,
                        // 채널 키 설정
                        channelKey: `${import.meta.env.VITE_PORTONE_CHANNEL_KEY}`,
                        noticeUrls: [`${import.meta.env.VITE_PORTONE_WEBHOOK_URL}`],
                        paymentId: data.id,
                        orderName:
                            orderItems.length > 1
                                ? `${orderItems[0].name}외 ${orderItems.length - 1}건`
                                : `${orderItems[0].name}`,
                        totalAmount: totalAmount,
                        pgProvider: 'PG_PROVIDER_TOSSPAYMENTS',
                        currency: 'CURRENCY_KRW',
                        payMethod: data.paymentInfo.paymentMethod === 'card' ? 'CARD' : 'TRANSFER',
                        redirectUrl: `https://daydream-haven.vercel.app/order/${data.id}`,
                    });

                    if (response?.code != null) {
                        // 오류 발생
                        return alert(response?.message);
                    }

                    if (response?.paymentId) {
                        dispatch({ type: 'payment/paymentState', paymentId: response?.paymentId });
                        navigate(`${data.id}`);
                    }
                } else {
                    // 무통장입금은 추후 입금
                    // 결제 성공한 것으로 상태 변경

                    dispatch(paymentSuccess());
                    navigate(`${data.id}`);
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // 여기서 error는 AxiosError 타입으로 추론됩니다.
                console.error('Error response data:', error.response?.data);
                console.error('Error response status:', error.response?.status);
            } else {
                // 다른 종류의 에러 처리
                console.error('Unexpected error:', error);
            }
        }
    };

    const subtitleStyle = { px: 3, mb: 2, fontSize: isMobile ? 16 : 20, fontWeight: 600 };
    const contentStyle = { display: 'flex', justifyContent: 'center', py: 1, fontSize: isMobile ? 15 : 18 };
    const orderPriceBoxStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        px: 3,
    };
    const inputBoxStyle = {
        '& .MuiInputBase-root': {
            height: isMobile ? 30 : 35,
            fontSize: isMobile ? 15 : 17,
        },
    };
    const inputBoxLabelStyle = {
        '& .MuiInputLabel-root': {
            fontSize: isMobile ? 13 : 15,
        },
    };
    const formControlLabelStyle = {
        '& .MuiFormControlLabel-label': {
            fontSize: isMobile ? 15 : 18,
        },
    };

    return (
        <OrderPaymentPaper>
            <Container maxWidth="lg">
                {userInfo ? (
                    <Box sx={{ minHeight: '100vh', pt: 10, mt: isMobile ? 3 : 8 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography sx={{ fontSize: isMobile ? 24 : 30, mb: 3 }}>결제하기</Typography>
                        </Box>

                        <Formik
                            initialValues={{
                                postcode: '',
                                address: '',
                                additionalAddress: '',
                                selectedPaymentMethod: '카드결제',
                                orderer: '',
                                cashReceipt: false,
                                issuanceTarget: '개인',
                                issuanceTargetNumber: '',
                                paymentAgreed: false,
                            }}
                            validationSchema={orderSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, values, setFieldValue, handleChange }) => {
                                return (
                                    <Form>
                                        <Grid container spacing={2} minHeight="100vh">
                                            {/* 파트1 부분 */}
                                            <Grid item xs={12} sm={12} md={8}>
                                                <Box sx={{ pt: 3, bgcolor: '#ffffff' }}>
                                                    <Typography sx={subtitleStyle}>주문 상품 정보</Typography>
                                                    <Box sx={{ py: 1 }}>
                                                        {orderItems.map((item) => (
                                                            <OrderItem item={item} key={item.id} />
                                                        ))}
                                                    </Box>
                                                </Box>
                                                {/* 주문자정보 */}
                                                {userInfo && <OrdererInfo userInfo={userInfo} />}

                                                {/* 배송정보 */}
                                                <Box sx={{ mb: 1, py: 3, bgcolor: '#ffffff' }}>
                                                    <Typography sx={subtitleStyle}>배송 정보</Typography>
                                                    <Box sx={{ px: 3, py: 1 }}>
                                                        <Box sx={{ display: 'flex' }}>
                                                            <Box>
                                                                <Field
                                                                    as={TextField}
                                                                    name="postcode"
                                                                    value={values.postcode}
                                                                    variant="outlined"
                                                                    size="small"
                                                                    sx={{
                                                                        mr: 2,
                                                                        my: 1,
                                                                        ...inputBoxStyle,
                                                                    }}
                                                                />
                                                            </Box>
                                                            <AddressSearchForm
                                                                onAddressSelect={(selectedAddress: AddressProps) => {
                                                                    setFieldValue('postcode', selectedAddress.postcode);
                                                                    setFieldValue('address', selectedAddress.address);
                                                                }}
                                                            />
                                                        </Box>

                                                        <Field
                                                            name="address"
                                                            as={TextField}
                                                            value={values.address}
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                            error={!!errors.address}
                                                            helperText={errors.address}
                                                            sx={{
                                                                mt: 2,
                                                                my: 1,
                                                                ...inputBoxStyle,
                                                            }}
                                                        />
                                                        <Field
                                                            name="additionalAddress"
                                                            as={TextField}
                                                            value={values.additionalAddress}
                                                            label="상세주소"
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                            sx={{
                                                                mt: 1,
                                                                my: 1,
                                                                ...inputBoxStyle,
                                                                ...inputBoxLabelStyle,
                                                            }}
                                                            error={
                                                                errors.additionalAddress && touched.additionalAddress
                                                            }
                                                            helperText={
                                                                errors.additionalAddress && touched.additionalAddress
                                                                    ? errors.additionalAddress
                                                                    : ''
                                                            }
                                                        />
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            {/* 파트2 부분 */}
                                            <Grid item xs={12} sm={12} md={4}>
                                                {/* 주문 금액 정보 */}

                                                <Grid container sx={{ mb: 3, py: 3, bgcolor: '#ffffff' }}>
                                                    <Grid item xs={12}>
                                                        <Typography sx={subtitleStyle}>주문 요약</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Box sx={orderPriceBoxStyle}>
                                                            <Typography sx={contentStyle}>상품금액</Typography>
                                                            <Typography sx={contentStyle}>
                                                                {formatNumber(subTotal)} 원
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Box sx={orderPriceBoxStyle}>
                                                            <Typography sx={contentStyle}>배송비</Typography>
                                                            <Typography sx={contentStyle}>
                                                                {deliveryFee ? '3,000원' : '무료'}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                my: 1,
                                                                fontSize: isMobile ? 12 : 15,
                                                            }}
                                                        >
                                                            <Divider
                                                                sx={{
                                                                    width: '100%',
                                                                }}
                                                            />
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Box sx={orderPriceBoxStyle}>
                                                            <Typography sx={contentStyle}>최종 결제금액</Typography>
                                                            <Typography sx={contentStyle}>
                                                                {formatNumber(totalAmount)} 원
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>

                                                {/* 결제수단 정보 */}
                                                <Box sx={{ mb: 3, py: 3, bgcolor: '#ffffff' }}>
                                                    <Typography sx={subtitleStyle}>결제 수단</Typography>
                                                    <RadioGroup
                                                        name="selectedPaymentMethod"
                                                        value={values.selectedPaymentMethod}
                                                        onChange={handleChange}
                                                        sx={{ px: 3 }}
                                                    >
                                                        {['카드결제', '실시간 계좌이체', '무통장입금'].map((option) => (
                                                            <FormControlLabel
                                                                key={option}
                                                                value={option}
                                                                control={<Radio />}
                                                                label={option}
                                                                sx={formControlLabelStyle}
                                                            />
                                                        ))}
                                                    </RadioGroup>

                                                    {values.selectedPaymentMethod === '무통장입금' && (
                                                        <>
                                                            <TextField
                                                                value="기업은행 001-000000-00-001 (주)데이드림해븐"
                                                                name="account"
                                                                variant="outlined"
                                                                size="small"
                                                                fullWidth
                                                                sx={{
                                                                    mr: 1,
                                                                    mt: 2,
                                                                    px: 3,
                                                                    ...inputBoxStyle,
                                                                }}
                                                            />
                                                            <Field
                                                                as={TextField}
                                                                value={values.orderer}
                                                                name="orderer"
                                                                variant="outlined"
                                                                size="small"
                                                                fullWidth
                                                                label="입금자명"
                                                                sx={{
                                                                    ml: 3,
                                                                    mt: 2,
                                                                    pr: 6,
                                                                    ...inputBoxStyle,
                                                                    ...inputBoxLabelStyle,
                                                                }}
                                                                error={!!errors.orderer && touched.orderer}
                                                                helperText={
                                                                    errors.orderer && touched.orderer
                                                                        ? errors.orderer
                                                                        : ''
                                                                }
                                                            />
                                                            <Typography
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    py: 2,
                                                                    color: '#8C6A5D',
                                                                    fontSize: isMobile ? 12 : 15,
                                                                }}
                                                            >
                                                                주문 후 72시간 이내 미입금시 자동 취소됩니다.
                                                            </Typography>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    my: 2,
                                                                }}
                                                            >
                                                                <Divider
                                                                    sx={{
                                                                        width: '100%',
                                                                    }}
                                                                />
                                                            </Box>
                                                            <RadioGroup
                                                                name="cashReceipt"
                                                                value={values.cashReceipt}
                                                                onChange={(
                                                                    event: React.ChangeEvent<HTMLInputElement>,
                                                                ) => {
                                                                    const value = event.target.value === 'true'; // 문자열 값을 불리언으로 변환
                                                                    setFieldValue(event.target.name, value);
                                                                }}
                                                                row
                                                            >
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio />}
                                                                    label="현금영수증 신청"
                                                                    sx={{ px: 3, ...formControlLabelStyle }}
                                                                />
                                                                <FormControlLabel
                                                                    value="false"
                                                                    control={<Radio />}
                                                                    label="신청안함"
                                                                    sx={{ px: 3, ...formControlLabelStyle }}
                                                                />
                                                            </RadioGroup>

                                                            {/* 현금영수증 신청폼 */}
                                                            {values.cashReceipt && (
                                                                <>
                                                                    <RadioGroup
                                                                        name="issuanceTarget"
                                                                        value={values.issuanceTarget}
                                                                        onChange={handleChange}
                                                                        row
                                                                    >
                                                                        {['개인', '사업자'].map((target) => (
                                                                            <FormControlLabel
                                                                                key={target}
                                                                                value={target}
                                                                                control={<Radio />}
                                                                                label={target}
                                                                                sx={{ px: 3, ...formControlLabelStyle }}
                                                                            />
                                                                        ))}
                                                                    </RadioGroup>
                                                                    <Field
                                                                        as={TextField}
                                                                        value={values.issuanceTargetNumber}
                                                                        name="issuanceTargetNumber"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        fullWidth
                                                                        label={
                                                                            values.issuanceTarget === '개인'
                                                                                ? '전화번호 입력'
                                                                                : '사업자번호 입력'
                                                                        }
                                                                        sx={{
                                                                            ml: 3,
                                                                            mt: 2,
                                                                            pr: 6,
                                                                            ...inputBoxStyle,
                                                                            ...inputBoxLabelStyle,
                                                                        }}
                                                                        error={
                                                                            !!errors.issuanceTargetNumber &&
                                                                            touched.issuanceTargetNumber
                                                                        }
                                                                        helperText={
                                                                            errors.issuanceTargetNumber &&
                                                                            touched.issuanceTargetNumber
                                                                                ? errors.issuanceTargetNumber
                                                                                : ''
                                                                        }
                                                                    />
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </Box>
                                                {/* 결제 동의 확인 */}
                                                <Box
                                                    sx={{
                                                        mb: 3,
                                                        bgcolor: '#ffffff',
                                                        p: 3,
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        label="전체 동의"
                                                        control={
                                                            <Checkbox
                                                                name="paymentAgreed"
                                                                color="primary"
                                                                size="small"
                                                                checked={values.paymentAgreed}
                                                                onChange={handleChange}
                                                            />
                                                        }
                                                        sx={formControlLabelStyle}
                                                    />
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                                        <FormControlLabel
                                                            label="구매조건 확인 및 결제진행에 동의"
                                                            control={
                                                                <Checkbox
                                                                    name="paymentAgreed"
                                                                    color="primary"
                                                                    size="small"
                                                                    checked={values.paymentAgreed}
                                                                    onChange={handleChange}
                                                                />
                                                            }
                                                            sx={formControlLabelStyle}
                                                        />
                                                    </Box>
                                                    <Box sx={{ color: 'red', fontSize: 12, m: 1 }}>
                                                        <ErrorMessage
                                                            name={`paymentAgreed`}
                                                            component="div"
                                                            className="error"
                                                        />
                                                    </Box>
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                                                    <Button
                                                        type="submit"
                                                        variant="outlined"
                                                        sx={{
                                                            width: isMobile ? 240 : '100%',
                                                            height: isMobile ? 40 : 50,
                                                            fontSize: isMobile ? 15 : 20,
                                                            color: '#ffffff',
                                                            background: '#B67352',

                                                            '&:hover': {
                                                                color: '#ffffff',
                                                                background: '#B67352',
                                                            },
                                                            mb: 10,
                                                        }}
                                                    >
                                                        결제하기
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </Box>
                ) : (
                    <Box sx={{ minHeight: '100vh' }}></Box>
                )}
            </Container>
        </OrderPaymentPaper>
    );
};

export default OrderPayment;
