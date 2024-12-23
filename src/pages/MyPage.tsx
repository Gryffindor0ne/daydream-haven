import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Grid, Typography } from '@mui/material';

import getAllOrderAPI from '~/api/getAllOrderAPI';
import { useAppDispatch } from '~/app/reduxHooks';
import OrderList from '~/components/order/OrderList';
import { setLoading } from '~/features/auth/authSlice';

import useScrollToTop from '~/hooks/useScrollToTop';
import useFetchUserInfo from '~/hooks/useFetchUserInfo';
import useFetchSubscriptionInfo from '~/hooks/useFetchSubscriptionInfo';
import useFetchProductInfo from '~/hooks/useFecthProductInfo';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { transformOrdersWithProducts } from '~/utils/orderTransform';
import { ProductInfo } from '~/types/product';
import { formatNumber } from '~/utils/number';
import { UserInfoProps } from '~/types/user';
import { OrderDetailProps } from '~/types/order';

const MyPage = () => {
    const { isTabletOrMobile } = useResponsiveLayout();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useScrollToTop();

    const [userInfo, setUserInfo] = useState<UserInfoProps>();
    const [allOrders, setAllOrders] = useState<OrderDetailProps[]>([]);
    const [productInfo, setProductInfo] = useState<ProductInfo[]>([]);
    const [subscriptionInfo, setSubscriptionInfo] = useState<ProductInfo[]>([]);
    const [productIds, setProductIds] = useState<string>('');
    const [subscriptionIds, setSubscriptionIds] = useState<string>('');
    const [transformedOrders, setTransformedOrders] = useState<OrderDetailProps[]>([]);

    const extractItemIds = (orders: OrderDetailProps[], type: string) =>
        orders.flatMap((order) => order.items.filter((item) => item.type === type).map((item) => item.id));

    useFetchUserInfo({ setUserInfo });

    useEffect(() => {
        dispatch(setLoading(!userInfo));
    }, [dispatch, userInfo]);

    useEffect(() => {
        const fetchAllOrderInfo = async () => {
            dispatch(setLoading(true));
            try {
                const response = await getAllOrderAPI();

                if (response) {
                    setAllOrders(response);
                }
            } catch (error) {
                console.error('Error fetching all order info:', error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchAllOrderInfo();
    }, [dispatch, setAllOrders]);

    useEffect(() => {
        if (allOrders.length > 0) {
            const productIds = extractItemIds(allOrders, 'product').join(',');
            const subscriptionIds = extractItemIds(allOrders, 'subscription').join(',');

            if (productIds) {
                setProductIds(productIds);
            }

            if (subscriptionIds) {
                setSubscriptionIds(subscriptionIds);
            }
        }
    }, [allOrders]);

    // 상품 정보 가져오기
    useFetchProductInfo({ productIds, setProductInfo });

    // 구독 정보 가져오기
    useFetchSubscriptionInfo({ subscriptionIds, setSubscriptionInfo });

    useEffect(() => {
        if ((allOrders.length > 0 && productInfo.length > 0) || subscriptionInfo.length > 0) {
            // 주문 내역 변환
            const newOrders = transformOrdersWithProducts(allOrders, productInfo, subscriptionInfo);
            setTransformedOrders(newOrders);
        }
    }, [allOrders, productInfo, subscriptionInfo]);

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
                    {allOrders.length > 0 ? <OrderList orders={transformedOrders} /> : <EmptyOrderMessage />}
                </Box>
            </>
        </Container>
    );
};

export default MyPage;
