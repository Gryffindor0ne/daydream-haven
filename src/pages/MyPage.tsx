import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useAppDispatch, useAppSelector } from '~/app/reduxHooks';
import useScrollToTop from '~/hooks/useScrollToTop';
import { UserInfoProps } from '~/components/order/OrdererInfo';
import useFetchUserInfo from '~/hooks/useFetchUserInfo';
import { setLoading } from '~/features/auth/authSlice';
import OrderList from '~/components/order/OrderList';
import { allOrdersState } from '~/features/order/allOrdersSlice';
import { ProductInfo } from '~/components/product/ProductsList';
import useFetchProductInfo from '~/hooks/useFecthProductInfo';
import { OrderDetailProps } from '~/features/payment/paymentSaga';
import { transformOrdersWithProducts } from '~/utils/orderTransform';
import useFetchSubscriptionInfo from '~/hooks/useFetchSubscriptionInfo';

const MyPage = () => {
    const theme = useTheme();
    const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { allOrders } = useAppSelector(allOrdersState);

    useScrollToTop();

    const [userInfo, setUserInfo] = useState<UserInfoProps>();
    const [productInfo, setProductInfo] = useState<ProductInfo[]>([]);
    const [subscriptionInfo, setSubscriptionInfo] = useState<ProductInfo[]>([]);
    const [productIds, setProductIds] = useState<string>('');
    const [subscriptionIds, setSubscriptionIds] = useState<string>('');
    const [transformedOrders, setTransformedOrders] = useState<OrderDetailProps[]>([]);

    useEffect(() => {
        dispatch(setLoading(!userInfo));
    }, [dispatch, userInfo]);

    useFetchUserInfo({ setUserInfo });

    useEffect(() => {
        if (allOrders) {
            const productIds = allOrders.flatMap((order) => {
                return order.items.filter((item) => item.type === 'product').map((item) => item.id);
            });

            const subscriptionIds = allOrders.flatMap((order) => {
                return order.items.filter((item) => item.type === 'subscription').map((item) => item.id);
            });

            if (productIds.length !== 0) {
                setProductIds(productIds.join(','));
            }

            if (subscriptionIds.length !== 0) {
                setSubscriptionIds(subscriptionIds.join(','));
            }
        }
    }, [allOrders]);

    // 상품 정보 가져오기
    useFetchProductInfo({ productIds, setProductInfo });

    // 구독 정보 가져오기
    useFetchSubscriptionInfo({ subscriptionIds, setSubscriptionInfo });

    useEffect(() => {
        if (productInfo && allOrders) {
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
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>주문한 내역이 없습니다.</Typography>
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ minHeight: 1400 }}>
            {userInfo && (
                <>
                    <Box sx={{ pt: 25, px: isTabletOrMobile ? 1 : 2, mb: 15 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                                sx={{
                                    fontSize: 25,
                                }}
                            >
                                마이 페이지
                            </Typography>
                            <Button
                                onClick={handleLogout}
                                sx={{
                                    color: '#503C3C',
                                    fontFamily: 'Merriweather',
                                    fontWeight: 400,
                                    fontSize: 14,
                                    background: '#F4EDCC',
                                }}
                            >
                                로그아웃
                            </Button>
                        </Box>
                        <Box sx={{ mt: 5 }}>
                            <Typography sx={{ fontSize: 20, fontFamily: 'Gowun Batang', display: 'flex' }}>
                                안녕하세요,
                                <Box
                                    component="span"
                                    sx={{ fontSize: 20, fontFamily: 'Gowun Batang', fontWeight: 600, px: 1 }}
                                >
                                    {userInfo?.name}
                                </Box>
                                님
                            </Typography>
                        </Box>
                    </Box>
                    <Typography
                        sx={{
                            fontSize: 20,
                            px: isTabletOrMobile ? 2 : 0,
                        }}
                    >
                        주문 목록
                    </Typography>
                    {transformedOrders.length > 0 ? <OrderList orders={transformedOrders} /> : <EmptyOrderMessage />}
                </>
            )}
        </Container>
    );
};

export default MyPage;
