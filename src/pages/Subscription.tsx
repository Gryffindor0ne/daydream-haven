import { useCallback, useEffect, useState } from 'react';

import { Container, Box } from '@mui/material';

import { useAppDispatch } from '~/app/reduxHooks';
import getSubscriptionsAPI from '~/api/getSubscriptionsAPI';
import ProductsList from '~/components/product/ProductsList';
import { setLoading } from '~/features/auth/authSlice';
import useScrollToTop from '~/hooks/useScrollToTop';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';

const Subscription = () => {
    const dispatch = useAppDispatch();
    const [subscriptions, setSubscriptions] = useState([]);
    const { isMobile } = useResponsiveLayout();

    useScrollToTop();

    const getSubscriptions = useCallback(async () => {
        dispatch(setLoading(true));

        try {
            const data = await getSubscriptionsAPI();
            setSubscriptions(data);
        } catch (error) {
            console.error('Failed to fetch subscriptions:', error);
        } finally {
            dispatch(setLoading(false)); // 비동기 작업 완료 후 항상 로딩 상태를 false로 설정합니다.
        }
    }, [dispatch]);

    useEffect(() => {
        getSubscriptions();
    }, [getSubscriptions]);

    return (
        <Container maxWidth="xl">
            <Box sx={{ minHeight: '75vh', pt: isMobile ? 5 : 12, px: 2, mt: 10, mb: 22 }}>
                {subscriptions.length !== 0 && <ProductsList lists={subscriptions} />}
            </Box>
        </Container>
    );
};

export default Subscription;
