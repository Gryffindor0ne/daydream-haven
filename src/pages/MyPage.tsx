import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Grid, Typography } from '@mui/material';

import getAllOrderAPI from '~/api/getAllOrderAPI';
import getProductDetailAPI from '~/api/getProductDetailAPI';
import getSubscriptionDetailAPI from '~/api/getSubscriptionDetailAPI';
import { useAppDispatch } from '~/app/reduxHooks';
import OrderList from '~/components/order/OrderList';
import LoadingSpinner from '~/components/common/LoadingSpinner';
import { setLoading } from '~/features/auth/authSlice';

import useScrollToTop from '~/hooks/useScrollToTop';
import useFetchUserInfo from '~/hooks/useFetchUserInfo';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { transformOrdersWithProducts } from '~/utils/orderTransform';
import { formatNumber } from '~/utils/number';
import { UserInfoProps } from '~/types/user';
import { OrderDetailProps } from '~/types/order';

const MyPage = () => {
    const { isTabletOrMobile } = useResponsiveLayout();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useScrollToTop();

    const [userInfo, setUserInfo] = useState<UserInfoProps>();

    const [orders, setOrders] = useState<{
        items: OrderDetailProps[];
        hasMore: boolean;
        isLoading: boolean;
    }>({
        items: [],
        hasMore: true,
        isLoading: false,
    });

    const ordersPerPage = 5;
    const pageRef = useRef(0);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const initialLoadDone = useRef(false);

    const extractItemIds = (orders: OrderDetailProps[], type: string) =>
        orders.flatMap((order) => order.items.filter((item) => item.type === type).map((item) => item.id));

    useFetchUserInfo({ setUserInfo });

    useEffect(() => {
        dispatch(setLoading(!userInfo));
    }, [dispatch, userInfo]);

    const hasMoreRef = useRef(orders.hasMore);
    const isLoadingRef = useRef(orders.isLoading);

    // 데이터 불러오기 함수
    const fetchOrders = useCallback(async () => {
        if (isLoadingRef.current || !hasMoreRef.current) return;
        isLoadingRef.current = true;
        setOrders((prev) => ({ ...prev, isLoading: true }));

        try {
            const response = await getAllOrderAPI({
                page: pageRef.current, // 최신 page 값 참조
                limit: ordersPerPage,
            });

            if (response) {
                const { data: newOrders, hasMore: moreOrders } = response;

                const productIds = extractItemIds(newOrders, 'product').join(',');
                const subscriptionIds = extractItemIds(newOrders, 'subscription').join(',');

                const [newProductInfo, newSubscriptionInfo] = await Promise.all([
                    productIds ? getProductDetailAPI(productIds) : [],
                    subscriptionIds ? getSubscriptionDetailAPI(subscriptionIds) : [],
                ]);

                const transformedNewOrders = transformOrdersWithProducts(
                    newOrders,
                    newProductInfo,
                    newSubscriptionInfo,
                );

                setOrders((prev) => ({
                    items: [...prev.items, ...transformedNewOrders],
                    hasMore: moreOrders,
                    isLoading: false,
                }));

                pageRef.current += 1;
                hasMoreRef.current = moreOrders;
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            isLoadingRef.current = false;
            setOrders((prev) => ({ ...prev, isLoading: false }));
        }
    }, []);

    // 초기 데이터 로드
    useEffect(() => {
        if (!initialLoadDone.current && orders.items.length === 0) {
            fetchOrders();
            initialLoadDone.current = true;
        }
    }, [fetchOrders, orders.items.length]);

    // Intersection Observer로 스크롤 감지
    useEffect(() => {
        const currentRef = loadMoreRef.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && orders.hasMore && !orders.isLoading) {
                    fetchOrders();
                }
            },
            { threshold: 0.1 },
        );
        observer.observe(currentRef);

        return () => observer.disconnect();
    }, [orders.hasMore, orders.isLoading, fetchOrders]);

    const handleLogout = () => {
        dispatch({ type: 'auth/logoutUser' });
        navigate('/');
    };

    const EmptyOrderMessage = () => (
        <Box sx={{ my: 5, p: 5, border: '3px solid #F4EDCC', borderRadius: 1 }}>
            <Typography
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isTabletOrMobile ? 15 : 20,
                }}
            >
                주문 내역이 없습니다.
            </Typography>
        </Box>
    );

    if (!userInfo) return <Box sx={{ minHeight: '120vh' }}></Box>;

    return (
        <Container maxWidth="lg" sx={{ minHeight: 1400 }}>
            <>
                <Box
                    sx={{
                        pt: isTabletOrMobile ? 15 : 25,
                        px: isTabletOrMobile ? 1 : 2,
                        mb: isTabletOrMobile ? 4 : 8,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                            sx={{
                                fontSize: isTabletOrMobile ? 25 : 30,
                                pl: isTabletOrMobile ? 1 : 0,
                            }}
                        >
                            마이 페이지
                        </Typography>
                        <Button
                            onClick={handleLogout}
                            sx={{
                                width: isTabletOrMobile ? 80 : 120,
                                color: '#503C3C',
                                fontFamily: 'Merriweather',
                                fontWeight: 400,
                                fontSize: isTabletOrMobile ? 14 : 18,
                                background: '#F4EDCC',
                            }}
                        >
                            로그아웃
                        </Button>
                    </Box>
                    <Box>
                        <Box sx={{ mt: 7 }}>
                            <Typography
                                sx={{
                                    fontSize: isTabletOrMobile ? 20 : 25,
                                    fontFamily: 'Gowun Batang',
                                    display: 'flex',
                                }}
                            >
                                안녕하세요,
                                <Box
                                    component="span"
                                    sx={{
                                        fontSize: isTabletOrMobile ? 20 : 25,
                                        fontFamily: 'Gowun Batang',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontWeight: 600,
                                        px: 1,
                                    }}
                                >
                                    {userInfo?.name}
                                </Box>
                                님
                            </Typography>
                        </Box>

                        <Grid
                            container
                            columns={{ xs: 2, sm: 2, md: 12 }}
                            sx={{
                                mt: isTabletOrMobile ? 2 : 5,
                                px: 4,
                                py: isTabletOrMobile ? 3 : 7,
                                background: '#F4EDCC',
                                borderRadius: 2,
                            }}
                        >
                            <Grid item xs={2} md={6} sx={{ mb: isTabletOrMobile ? 1 : 0 }}>
                                <Typography
                                    sx={{
                                        fontSize: isTabletOrMobile ? 15 : 20,
                                        fontFamily: 'Gowun Batang',
                                        display: 'flex',
                                    }}
                                >
                                    총 주문 금액 (횟수)
                                </Typography>
                            </Grid>

                            <Grid item xs={2} md={6}>
                                <Typography
                                    sx={{
                                        fontSize: isTabletOrMobile ? 20 : 25,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: isTabletOrMobile ? 'flex-start' : 'flex-end',
                                    }}
                                >
                                    {`${formatNumber(userInfo?.totalPurchaseAmount)}원`}

                                    <Box
                                        component="span"
                                        sx={{
                                            fontSize: isTabletOrMobile ? 15 : 20,
                                            fontFamily: 'Gowun Batang',
                                            px: 2,
                                        }}
                                    >
                                        (총 {userInfo?.totalPurchaseCount}회)
                                    </Box>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Box sx={{ pb: 10 }}>
                    <Typography
                        sx={{
                            fontSize: isTabletOrMobile ? 20 : 25,
                            px: isTabletOrMobile ? 1 : 0,
                        }}
                    >
                        주문 목록
                    </Typography>
                    {orders.items.length > 0 ? (
                        <>
                            <OrderList orders={orders.items} />
                            <Box ref={loadMoreRef} sx={{ height: '50', my: 10 }}>
                                {(orders.hasMore || orders.isLoading) && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <LoadingSpinner />
                                    </Box>
                                )}
                                {!orders.hasMore && orders.items.length > 0 && (
                                    <Typography
                                        sx={{
                                            textAlign: 'center',
                                            color: 'gray',
                                            mt: 5,
                                            fontSize: isTabletOrMobile ? 15 : 18,
                                        }}
                                    >
                                        모든 주문 내역을 불러왔습니다.
                                    </Typography>
                                )}
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box ref={loadMoreRef} sx={{ height: '50', my: 10 }}>
                                {/* 목록 불러오기 전 EmptyOrderMessage 뜨는 것 방지 */}
                                {orders.hasMore || orders.isLoading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <LoadingSpinner />
                                    </Box>
                                ) : (
                                    <EmptyOrderMessage />
                                )}
                            </Box>
                        </>
                    )}
                </Box>
            </>
        </Container>
    );
};

export default MyPage;
