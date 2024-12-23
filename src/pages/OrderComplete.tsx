import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Button, Container, Grid, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '~/app/reduxHooks';
import { clearOrder, orderState } from '~/features/order/orderSlice';

import { paymentState, resetPaymentState } from '~/features/payment/paymentSlice';
import { removeFromCart } from '~/features/cart/cartSlice';

import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';
import useScrollToTop from '~/hooks/useScrollToTop';
import useFetchUserInfo from '~/hooks/useFetchUserInfo';
import useFetchOrderInfo from '~/hooks/useFetchOrderInfo';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { paymentMethods } from '~/utils/constants';
import { formatDateToKorean } from '~/utils/date';
import { formatNumber } from '~/utils/number';
import { UserInfoProps } from '~/types/user';
import { OrderDetailProps } from '~/types/order';

const OrderComplete = () => {
    const { paymentStatus, error } = useAppSelector(paymentState);
    const { orderItems, totalAmount, directOrder } = useAppSelector(orderState);
    const { isMobile } = useResponsiveLayout();

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

    // 주문 상품명 포맷팅 유틸리티
    const formatOrderItemsName = (orderItems: Array<{ name: string }>) =>
        orderItems.length > 1 ? `${orderItems[0].name} 외 ${orderItems.length - 1} 건` : orderItems[0].name;

    const fontStyle = { fontSize: isMobile ? 12 : 15 };

    const commonGridProp = {
        display: 'flex',
        justifyContent: 'center',
        py: 0.7,
        pl: isMobile ? 0 : 5,
    };

    // 공통 정보 Row 컴포넌트
    const InfoRow = ({ title, content, sx }: { title: string; content: string | number; sx?: object }) => (
        <Grid item xs={12} sx={sx}>
            <Typography
                sx={{
                    width: isMobile ? 70 : 90,
                    fontSize: isMobile ? 15 : 20,
                    mb: 0.5,
                    mr: isMobile ? 3 : 6,
                    px: 0.5,
                }}
            >
                {title}
            </Typography>
            <Typography
                sx={{
                    width: isMobile ? 230 : 300,
                    fontSize: isMobile ? 15 : 20,
                }}
            >
                {content}
            </Typography>
        </Grid>
    );

    if (!userInfo) return <Box sx={{ minHeight: '120vh' }}></Box>;

    return (
        <Container
            maxWidth="lg"
            sx={{
                minHeight: '120vh',
            }}
        >
            <Grid
                container
                sx={{
                    pt: isMobile ? 15 : 25,
                    alignItems: 'center',
                }}
            >
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography
                        sx={{
                            fontSize: isMobile ? 25 : 35,
                            mb: isMobile ? 2 : 4,
                        }}
                    >
                        {paymentStatus === 'success' ? '주문완료' : '주문/결제'}
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography sx={{ fontSize: isMobile ? 18 : 25, mb: isMobile ? 2 : 5 }}>
                        {paymentStatus === 'success'
                            ? '주문이 정상적으로 완료되었습니다.'
                            : '주문이 정상적으로 완료되지 않았습니다.'}
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ py: 3 }}>
                    {paymentStatus === 'success' ? (
                        <Box
                            sx={{
                                flexDirection: 'column',
                                mb: isMobile ? 2 : 5,
                            }}
                        >
                            <InfoRow title="주문자" content={userInfo?.name || ''} sx={commonGridProp} />
                            <InfoRow title="주문 상품" content={formatOrderItemsName(orderItems)} sx={commonGridProp} />

                            <InfoRow
                                title="결제 금액"
                                content={`${formatNumber(totalAmount)} 원`}
                                sx={commonGridProp}
                            />

                            <InfoRow title="결제 방법" content={paymentMethodType as string} sx={commonGridProp} />

                            <InfoRow
                                title="주문 일시"
                                content={formatDateToKorean(orderInfo?.createdAt as string)}
                                sx={commonGridProp}
                            />

                            {paymentMethodType === '무통장입금' && (
                                <Box sx={{ mt: 5, textAlign: 'center' }}>
                                    <Typography sx={{ mb: 1, fontSize: isMobile ? 15 : 18 }}>
                                        기업은행 001-000000-00-001 (주)데이드림해븐
                                    </Typography>
                                    <Typography sx={{ fontSize: isMobile ? 15 : 18 }}>
                                        주문 후 72시간 이내 미입금시 자동 취소됩니다.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    ) : (
                        <Box>
                            <Box sx={{ my: 7 }}>
                                <Grid item xs={12} sx={{ mb: 0.5 }}>
                                    <Typography
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            width: '100%',
                                            fontSize: isMobile ? 15 : 18,
                                        }}
                                    >
                                        오류 사유
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            width: '100%',
                                            ...fontStyle,
                                        }}
                                    >
                                        {error}
                                    </Typography>
                                </Grid>
                            </Box>

                            <Box sx={{ mt: 5, textAlign: 'center' }}>
                                <Typography sx={{ mb: 1, fontSize: isMobile ? 15 : 18 }}>
                                    오류 발생으로 인해 결제가 정상적으로 이루어지지 않았습니다.
                                </Typography>
                                <Typography sx={{ fontSize: isMobile ? 15 : 18 }}>
                                    죄송하지만, 다시 시도해 주십시오.
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Grid>
                <Grid item xs={12} sx={{ ...commonGridProp, pl: 0 }}>
                    <Button
                        onClick={() => {
                            dispatch(clearOrder());
                            dispatch(resetPaymentState());
                            navigate('/');
                        }}
                        variant="outlined"
                        sx={{
                            width: 130,
                            ...fontStyle,
                            '&:hover': {
                                color: '#B67352',
                                background: '#ffffff',
                            },
                        }}
                    >
                        홈으로 가기
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OrderComplete;
