import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useAppDispatch, useAppSelector } from '~/app/reduxHooks';
import { UserInfoProps } from '~/components/order/OrdererInfo';
import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';
import { clearOrder, orderState } from '~/features/order/orderSlice';
import { OrderDetailProps } from '~/features/payment/paymentSaga';
import { paymentState, resetPaymentState } from '~/features/payment/paymentSlice';
import { formattedDate, formattedNumber } from '~/utils/utils';
import { paymentMethods } from '~/utils/constants';
import useScrollToTop from '~/hooks/useScrollToTop';
import useFetchUserInfo from '~/hooks/useFetchUserInfo';
import useFetchOrderInfo from '~/hooks/useFetchOrderInfo';
import { removeFromCart } from '~/features/cart/cartSlice';

const OrderComplete = () => {
    const { paymentStatus, error } = useAppSelector(paymentState);
    const { orderItems, totalAmount, directOrder } = useAppSelector(orderState);

    useScrollToTop();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useCurrentPathAndId();

    //moblie일 경우 응답을 쿼리로 받기에 따로 처리.
    const location = useLocation();
    const queryParams = useMemo(() => {
        return new URLSearchParams(location.search);
    }, [location.search]);

    const paymentId = queryParams.get('paymentId');

    useEffect(() => {
        if (paymentId) {
            dispatch({ type: 'payment/paymentState', paymentId: paymentId });
        }
    }, [dispatch, paymentId]);

    // 주문 성공시 주문내역 호출

    useEffect(() => {
        if (paymentStatus === 'success') {
            if (!directOrder) {
                dispatch(removeFromCart([]));
            }
            dispatch({ type: 'allOrders/fetchAllOrders' });
        }
    }, [directOrder, dispatch, paymentStatus]);

    const [userInfo, setUserInfo] = useState<UserInfoProps>();
    const [orderInfo, setOrderInfo] = useState<OrderDetailProps>();

    const paymentMethodType = Object.keys(paymentMethods).find(
        (key) => paymentMethods[key] === orderInfo?.paymentInfo.paymentMethod,
    );

    // 뒤로 가기 클릭시 현재페이지로 다시 리다이렉트
    window.onpopstate = function () {
        // 주문 완료 페이지 URL
        const orderCompletedUrl = `order/${id}`; // 주문 완료 페이지 URL에 맞게 수정
        // 현재 페이지 URL과 주문 완료 페이지 URL 비교
        if (window.location.pathname !== orderCompletedUrl) {
            window.location.href = orderCompletedUrl;
        }
    };

    // 유저 정보 호출
    useFetchUserInfo({ setUserInfo });

    // 주문 정보 호출
    useFetchOrderInfo({ id: paymentId ?? id, setOrderInfo });

    return (
        <Container maxWidth="lg">
            {userInfo ? (
                <Box sx={{ minHeight: '120vh', pt: 12, mt: 10 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography sx={{ fontSize: 34, mb: 5 }}>
                            {paymentStatus === 'success' ? '주문완료' : '주문/결제'}
                        </Typography>
                        <Typography sx={{ fontSize: 40, mb: 15 }}>
                            {paymentStatus === 'success'
                                ? '주문이 정상적으로 완료되었습니다.'
                                : '주문이 정상적으로 완료되지 않았습니다.'}
                        </Typography>

                        {paymentStatus === 'success' ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    mb: 5,
                                    width: 400,
                                }}
                            >
                                {/* ------------------------------------- */}
                                <Box sx={{ display: 'flex', my: 1 }}>
                                    <Typography
                                        sx={{
                                            width: 120,
                                            fontSize: 15,
                                            my: 0.5,
                                            pl: 1,
                                        }}
                                    >
                                        주문자
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 15,
                                            my: 0.5,
                                            px: 1,
                                        }}
                                    >
                                        {userInfo?.name}
                                    </Typography>
                                </Box>
                                {/* ------------------------------------- */}
                                <Box sx={{ display: 'flex', my: 1 }}>
                                    <Typography
                                        sx={{
                                            width: 120,
                                            fontSize: 15,
                                            my: 0.5,
                                            pl: 1,
                                        }}
                                    >
                                        주문 상품
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 15,
                                            my: 0.5,
                                            px: 1,
                                        }}
                                    >
                                        {orderItems.length > 1
                                            ? `${orderItems[0].name} 외 ${orderItems.length - 1} 건`
                                            : orderItems[0].name}
                                    </Typography>
                                </Box>
                                {/* ------------------------------------- */}

                                <Box sx={{ display: 'flex', my: 1 }}>
                                    <Typography
                                        sx={{
                                            width: 120,
                                            fontSize: 15,
                                            my: 0.5,
                                            pl: 1,
                                        }}
                                    >
                                        결제 금액
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 15,
                                            my: 0.5,
                                            px: 1,
                                        }}
                                    >
                                        {formattedNumber(totalAmount)} 원
                                    </Typography>
                                </Box>
                                {/* ------------------------------------- */}
                                <Box sx={{ display: 'flex', my: 1 }}>
                                    <Typography
                                        sx={{
                                            width: 120,
                                            fontSize: 15,
                                            my: 0.5,
                                            pl: 1,
                                        }}
                                    >
                                        결제 방법
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 15,
                                            my: 0.5,
                                            px: 1,
                                        }}
                                    >
                                        {paymentMethodType}
                                    </Typography>
                                </Box>
                                {/* ------------------------------------- */}
                                <Box sx={{ display: 'flex', my: 1 }}>
                                    <Typography
                                        sx={{
                                            width: 120,
                                            fontSize: 15,
                                            my: 0.5,
                                            pl: 1,
                                        }}
                                    >
                                        주문 일시
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 15,
                                            my: 0.5,
                                            px: 1,
                                        }}
                                    >
                                        {formattedDate(orderInfo?.createdAt as string)}
                                    </Typography>
                                </Box>
                                {/* ------------------------------------- */}

                                {paymentMethodType === '무통장입금' && (
                                    <Box sx={{ my: 3 }}>
                                        <Typography
                                            sx={{
                                                width: 400,
                                                fontSize: 15,
                                                my: 0.5,
                                                pl: 1,
                                            }}
                                        >
                                            기업은행 888-000000-01-999 (주)데이드림해븐
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: 15,
                                                my: 1,
                                                px: 1,
                                            }}
                                        >
                                            주문 후 72시간 이내 미입금시 자동 취소됩니다.
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    mb: 5,
                                    width: 400,
                                }}
                            >
                                {/* ------------------------------------- */}
                                <Box sx={{ display: 'flex', my: 1 }}>
                                    <Typography
                                        sx={{
                                            width: 120,
                                            fontSize: 15,
                                            my: 0.5,
                                            pl: 1,
                                        }}
                                    >
                                        오류 사유
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 15,
                                            my: 0.5,
                                            px: 1,
                                        }}
                                    >
                                        {error}
                                    </Typography>
                                </Box>
                                {/* ------------------------------------- */}

                                <Box sx={{ my: 3 }}>
                                    <Typography
                                        sx={{
                                            width: 400,
                                            fontSize: 15,
                                            my: 0.5,
                                            pl: 1,
                                        }}
                                    >
                                        오류가 발생하여 결제가 정상적으로 이루어지지 않았습니다.
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 15,
                                            my: 1,
                                            px: 1,
                                        }}
                                    >
                                        죄송하지만, 다시 시도해 주십시오.
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                        <Button
                            onClick={() => {
                                dispatch(clearOrder());
                                dispatch(resetPaymentState());
                                navigate('/');
                            }}
                            variant="outlined"
                            sx={{
                                width: 130,
                                fontSize: 14,
                                '&:hover': {
                                    color: '#B67352',
                                    background: '#ffffff',
                                },
                            }}
                        >
                            홈으로 가기
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ minHeight: '120vh' }}></Box>
            )}
        </Container>
    );
};

export default OrderComplete;
