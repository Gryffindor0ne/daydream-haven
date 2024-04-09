import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, FormControlLabel, Paper, Radio, RadioGroup } from '@mui/material';
import { styled } from '@mui/system';

import { useAppSelector } from '~/app/reduxHooks';
import { orderState } from '~/features/order/orderSlice';
import { formattedNumber } from '~/utils/utils';
import OrderItem from '~/components/OrderItem';
import AddressSearchForm from '~/components/AddressSeacrchForm';
import OrdererInfo from '~/components/OrdererInfo';

// 주문결제 페이지 배경색 설정
const OrderPaymentPaper = styled(Paper)(() => ({
    backgroundColor: '#EEEDEB',
}));

export type AddressProps = {
    zonecode: string;
    address: string;
};

const orderSchema = Yup.object().shape({
    address: Yup.string().required('주소는 필수 입력 항목입니다.'),
    additionalAddress: Yup.string().required('추가 주소는 필수 입력 항목입니다.'),
    selectedPaymentMethod: Yup.string().oneOf(['카드결제', '실시간 계좌이체', '무통장입금']),
    orderer: Yup.string().test('required-if-payment-method', '주문자명은 필수 입력 항목입니다.', function (value) {
        const selectedPaymentMethod = this.resolve(Yup.ref('selectedPaymentMethod'));
        if (selectedPaymentMethod === '무통장입금' || selectedPaymentMethod === '실시간 계좌이체') {
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

type OrderProps = {
    zonecode: string;
    address: string;
    additionalAddress: string;
    selectedPaymentMethod: string;
    orderer: string;
    cashReceipt: boolean;
    issuanceTarget: string;
    issuanceTargetNumber: string;
    paymentAgreed: boolean;
};

const OrderPayment = () => {
    const { orderItems, subTotal, deliveryFee, totalAmount } = useAppSelector(orderState);

    const handleSubmit = (values: OrderProps) => {
        console.log('submit!!!!!!!');
        console.log(values);
    };

    return (
        <OrderPaymentPaper>
            <Container maxWidth="lg">
                <Box sx={{ minHeight: '75vh', paddingTop: 12, marginTop: 10 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: 34, marginBottom: 5 }}>결제하기</Typography>
                    </Box>

                    <Formik
                        initialValues={{
                            zonecode: '',
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
                            console.log(values);
                            return (
                                <Form>
                                    <Grid container spacing={2} minHeight="100vh">
                                        {/* 파트1 부분 */}
                                        <Grid item xs={12} sm={12} md={8}>
                                            <Box sx={{ py: 3, bgcolor: '#ffffff' }}>
                                                <Typography variant="h6" sx={{ display: 'flex', px: 5 }}>
                                                    주문 상품 정보
                                                </Typography>
                                                {orderItems.map((item, idx) => (
                                                    <OrderItem item={item} key={idx} />
                                                ))}
                                            </Box>
                                            {/* 주문자정보 */}
                                            <OrdererInfo />

                                            {/* 배송정보 */}
                                            <Box sx={{ marginY: 3, py: 3, bgcolor: '#ffffff' }}>
                                                <Typography variant="h6" sx={{ px: 5 }}>
                                                    배송 정보
                                                </Typography>
                                                <Box sx={{ px: 5, py: 2 }}>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Box>
                                                            <Field
                                                                as={TextField}
                                                                name="zonecode"
                                                                value={values.zonecode}
                                                                variant="outlined"
                                                                size="small"
                                                                sx={{ mr: 2 }}
                                                            />
                                                        </Box>
                                                        <AddressSearchForm
                                                            onAddressSelect={(selectedAddress: AddressProps) => {
                                                                setFieldValue('zonecode', selectedAddress.zonecode);
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
                                                        sx={{ mr: 1, mt: 2 }}
                                                        error={!!errors.address}
                                                        helperText={errors.address}
                                                    />
                                                    <Field
                                                        name="additionalAddress"
                                                        as={TextField}
                                                        value={values.additionalAddress}
                                                        label="그외 주소"
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        sx={{ mr: 1, mt: 2 }}
                                                        error={errors.additionalAddress && touched.additionalAddress}
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

                                            <Box sx={{ marginBottom: 3, bgcolor: '#ffffff', p: 3 }}>
                                                <Typography variant="h6" sx={{ display: 'flex', pb: 2 }}>
                                                    주문 요약
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{ display: 'flex', justifyContent: 'center', py: 1 }}
                                                    >
                                                        상품금액
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{ display: 'flex', justifyContent: 'center', py: 1 }}
                                                    >
                                                        {formattedNumber(subTotal)} 원
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{ display: 'flex', justifyContent: 'center', py: 1 }}
                                                    >
                                                        배송비
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{ display: 'flex', justifyContent: 'center', py: 1 }}
                                                    >
                                                        {deliveryFee ? '3,000원' : '무료'}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 1 }}>
                                                    <Divider
                                                        sx={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{ display: 'flex', justifyContent: 'center', py: 1 }}
                                                    >
                                                        최종 결제금액
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{ display: 'flex', justifyContent: 'center', py: 1 }}
                                                    >
                                                        {formattedNumber(totalAmount)} 원
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* 결제수단 정보 */}
                                            <Box sx={{ marginBottom: 3, bgcolor: '#ffffff', p: 3 }}>
                                                <Typography variant="h6" sx={{ display: 'flex', pb: 2 }}>
                                                    결제 수단
                                                </Typography>
                                                <RadioGroup
                                                    name="selectedPaymentMethod"
                                                    value={values.selectedPaymentMethod}
                                                    onChange={handleChange}
                                                >
                                                    {['카드결제', '실시간 계좌이체', '무통장입금'].map((option) => (
                                                        <FormControlLabel
                                                            key={option}
                                                            value={option}
                                                            control={<Radio />}
                                                            label={option}
                                                        />
                                                    ))}
                                                </RadioGroup>

                                                {values.selectedPaymentMethod === '실시간 계좌이체' && (
                                                    <>
                                                        <Field
                                                            as={TextField}
                                                            value={values.orderer}
                                                            name="orderer"
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                            label="예금주명"
                                                            sx={{ mr: 1, mt: 2 }}
                                                            error={!!errors.orderer && touched.orderer}
                                                            helperText={
                                                                errors.orderer && touched.orderer ? errors.orderer : ''
                                                            }
                                                        />

                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                marginY: 3,
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
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                const value = event.target.value === 'true'; // 문자열 값을 불리언으로 변환
                                                                setFieldValue(event.target.name, value);
                                                            }}
                                                            row
                                                        >
                                                            <FormControlLabel
                                                                value="true"
                                                                control={<Radio />}
                                                                label="현금영수증 신청"
                                                            />
                                                            <FormControlLabel
                                                                value="false"
                                                                control={<Radio />}
                                                                label="신청안함"
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
                                                                    sx={{ mt: 2 }}
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
                                                {values.selectedPaymentMethod === '무통장입금' && (
                                                    <>
                                                        <TextField
                                                            value="기업은행 888-000000-01-999 (주)데이드림해븐"
                                                            name="account"
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                            sx={{ mr: 1, mt: 2 }}
                                                        />
                                                        <Field
                                                            as={TextField}
                                                            value={values.orderer}
                                                            name="orderer"
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                            label="입금자명"
                                                            sx={{ mr: 1, mt: 2 }}
                                                            error={!!errors.orderer && touched.orderer}
                                                            helperText={
                                                                errors.orderer && touched.orderer ? errors.orderer : ''
                                                            }
                                                        />
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                py: 2,
                                                                color: '#8C6A5D',
                                                            }}
                                                        >
                                                            주문 후 72시간 동안 미입금시 자동 취소됩니다.
                                                        </Typography>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                marginY: 2,
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
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                const value = event.target.value === 'true'; // 문자열 값을 불리언으로 변환
                                                                setFieldValue(event.target.name, value);
                                                            }}
                                                            row
                                                        >
                                                            <FormControlLabel
                                                                value="true"
                                                                control={<Radio />}
                                                                label="현금영수증 신청"
                                                            />
                                                            <FormControlLabel
                                                                value="false"
                                                                control={<Radio />}
                                                                label="신청안함"
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
                                                                    sx={{ mt: 2 }}
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
                                            <Box sx={{ marginBottom: 3, bgcolor: '#ffffff', p: 3 }}>
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
                                            <Box>
                                                <Button
                                                    type="submit"
                                                    variant="outlined"
                                                    sx={{
                                                        width: '100%',
                                                        height: 50,
                                                        fontSize: 16,
                                                        color: '#ffffff',
                                                        background: '#B67352',

                                                        '&:hover': {
                                                            color: '#ffffff',
                                                            background: '#B67352',
                                                        },
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
            </Container>
        </OrderPaymentPaper>
    );
};

export default OrderPayment;
