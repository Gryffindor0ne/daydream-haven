import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Button, Container, Grid, Typography } from '@mui/material';

import OrderItem from '~/components/order/OrderItem';
import useScrollToTop from '~/hooks/useScrollToTop';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import useFetchUserInfo from '~/hooks/useFetchUserInfo';

import { paymentMethods } from '~/utils/constants';
import { formatDateToKorean } from '~/utils/date';
import { formatNumber } from '~/utils/number';
import { formatPhoneNumber } from '~/utils/phone';
import { UserInfoProps } from '~/types/user';
import { OrderDetailProps, OrderItemSummaryInfo } from '~/types/order';

// 반복되는 Grid 레이아웃을 위한 컴포넌트
const InfoRow = ({
    label,
    value,
    isTabletOrMobile,
    contentStyleProp,
}: {
    label: string;
    value: string | number;
    isTabletOrMobile: boolean;
    contentStyleProp: object;
}) => (
    <>
        <Grid item xs={isTabletOrMobile ? 4 : 3} sx={contentStyleProp}>
            {label}
        </Grid>
        <Grid item xs={isTabletOrMobile ? 8 : 9} sx={contentStyleProp}>
            {typeof value === 'number' ? `${formatNumber(value)} 원` : value}
        </Grid>
    </>
);

const OrderDetail = () => {
    const { isTabletOrMobile } = useResponsiveLayout();
    const [userInfo, setUserInfo] = useState<UserInfoProps>();
    const location = useLocation();
    const navigate = useNavigate();

    useScrollToTop();
    useFetchUserInfo({ setUserInfo });

    const orderDetails: OrderDetailProps = location.state?.orderDetails;

    const mapOrderStatus = (status: string) => {
        const statusMap: Record<string, string> = {
            completed: '결제완료',
            pending: '결제 대기중',
            canceled: '결제취소',
            failed: '결제실패',
        };

        return statusMap[status] ?? '알 수 없는 상태';
    };

    const orderState = mapOrderStatus(orderDetails.status);
    const totalPrice = orderDetails.items.reduce((acc, cur) => acc + cur.price, 0);
    const paymentMethodType = Object.keys(paymentMethods).find(
        (key) => paymentMethods[key] === orderDetails?.paymentInfo.paymentMethod,
    );

    const contentStyleProp = {
        borderBottom: '1px solid #e0e0e0',
        fontSize: isTabletOrMobile ? 15 : 18,
        py: 1,
    };

    // 섹션 타이틀 스타일
    const sectionTitleStyle = {
        fontSize: isTabletOrMobile ? 20 : 23,
        fontWeight: 500,
        mb: 1,
    };

    // 공통 섹션 래퍼 컴포넌트
    const SectionWrapper = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <Grid item xs={12} sx={{ mb: 7 }}>
            <Grid item xs={12} sx={sectionTitleStyle}>
                {title}
            </Grid>
            {children}
        </Grid>
    );

    if (!userInfo) return <Box sx={{ minHeight: '120vh' }}></Box>;

    return (
        <Container maxWidth="lg" sx={{ minHeight: 1400 }}>
            <Grid
                container
                spacing={1}
                sx={{ pt: isTabletOrMobile ? 15 : 25, px: isTabletOrMobile ? 1 : 2, mb: isTabletOrMobile ? 4 : 8 }}
            >
                {/* 페이지 타이틀 */}
                <Grid item xs={12} sx={{ mb: 5 }}>
                    <Typography
                        sx={{
                            fontSize: isTabletOrMobile ? 25 : 30,
                            pl: isTabletOrMobile ? 1 : 0,
                        }}
                    >
                        주문 상세 조회
                    </Typography>
                </Grid>

                {/* 주문 정보 섹션 */}
                <SectionWrapper title="주문정보">
                    <Grid item xs={12}>
                        <Grid container spacing={2} sx={{ py: 2, px: 0.5 }}>
                            <InfoRow
                                label="주문번호"
                                value={orderDetails.id}
                                isTabletOrMobile={isTabletOrMobile}
                                contentStyleProp={contentStyleProp}
                            />
                            <InfoRow
                                label="주문일자"
                                value={formatDateToKorean(orderDetails.createdAt)}
                                isTabletOrMobile={isTabletOrMobile}
                                contentStyleProp={contentStyleProp}
                            />
                            <InfoRow
                                label="주문자"
                                value={orderDetails.deliveryInfo.name}
                                isTabletOrMobile={isTabletOrMobile}
                                contentStyleProp={contentStyleProp}
                            />
                        </Grid>
                    </Grid>
                </SectionWrapper>

                {/* 결제 정보 섹션 */}
                <SectionWrapper title="결제정보">
                    <Grid item xs={12}>
                        <Grid container spacing={2} sx={{ py: 2, px: 0.5 }}>
                            <InfoRow
                                label="총 주문금액"
                                value={totalPrice}
                                isTabletOrMobile={isTabletOrMobile}
                                contentStyleProp={contentStyleProp}
                            />
                            <InfoRow
                                label="총 결제금액"
                                value={totalPrice}
                                isTabletOrMobile={isTabletOrMobile}
                                contentStyleProp={contentStyleProp}
                            />
                            <InfoRow
                                label="결제수단"
                                value={paymentMethodType || ''}
                                isTabletOrMobile={isTabletOrMobile}
                                contentStyleProp={contentStyleProp}
                            />
                            <InfoRow
                                label="결제처리상태"
                                value={orderState}
                                isTabletOrMobile={isTabletOrMobile}
                                contentStyleProp={contentStyleProp}
                            />
                        </Grid>
                    </Grid>
                </SectionWrapper>

                {/* 주문 상품 정보 섹션 */}
                <SectionWrapper title="주문 상품 정보">
                    <Grid item xs={12}>
                        <Grid item xs={12} sx={{ border: '1px solid #e0e0e0' }}>
                            {orderDetails.items.map((item: OrderItemSummaryInfo) => (
                                <OrderItem key={item.id} item={item} />
                            ))}
                        </Grid>
                    </Grid>
                </SectionWrapper>

                {/* 배송지 정보 섹션 */}
                <SectionWrapper title="배송지 정보">
                    <Grid item xs={12}>
                        <Grid container spacing={2} sx={{ py: 2, px: 0.5 }}>
                            <InfoRow
                                label="받으시는 분"
                                value={orderDetails.deliveryInfo.name}
                                isTabletOrMobile={isTabletOrMobile}
                                contentStyleProp={contentStyleProp}
                            />
                            <InfoRow
                                label="전화번호"
                                value={formatPhoneNumber(userInfo?.phoneNumber || '')}
                                isTabletOrMobile={isTabletOrMobile}
                                contentStyleProp={contentStyleProp}
                            />
                            <InfoRow
                                label="우편번호"
                                value={orderDetails.deliveryInfo.postcode}
                                isTabletOrMobile={isTabletOrMobile}
                                contentStyleProp={contentStyleProp}
                            />
                            <InfoRow
                                label="주소"
                                value={`${orderDetails.deliveryInfo.address} ${orderDetails.deliveryInfo.addressDetail}`}
                                isTabletOrMobile={isTabletOrMobile}
                                contentStyleProp={contentStyleProp}
                            />
                        </Grid>
                    </Grid>
                </SectionWrapper>
                <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex', justifyContent: isTabletOrMobile ? 'center' : 'flex-end', mb: 5 }}
                >
                    <Button
                        onClick={() => {
                            navigate('/mypage');
                        }}
                        variant="outlined"
                        sx={{
                            width: 180,
                            fontSize: isTabletOrMobile ? 15 : 18,
                            '&:hover': {
                                color: '#B67352',
                                background: '#ffffff',
                            },
                        }}
                    >
                        주문 목록 보기
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};
export default OrderDetail;
