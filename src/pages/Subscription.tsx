import { useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import { useAppDispatch } from '~/app/reduxHooks';
import ProductsList from '~/components/product/ProductsList';
import { setLoading } from '~/features/auth/authSlice';
import { axiosInstance } from '~/lib/axiosInstance';

const Subscription = () => {
    const dispatch = useAppDispatch();

    const [lists, setLists] = useState([]);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 스크롤을 맨 위로 이동
        window.scrollTo(0, 0);
    }, []);

    const getLists = useCallback(async () => {
        dispatch(setLoading(true));

        try {
            const { data } = await axiosInstance.get(`/subscriptions`);
            setLists(data);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false)); // 비동기 작업 완료 후 항상 로딩 상태를 false로 설정합니다.
        }
    }, [dispatch]);

    useEffect(() => {
        getLists();
    }, [getLists]);

    return (
        <Box sx={{ minHeight: '75vh', paddingTop: 12, paddingX: 2, marginTop: 10, marginBottom: 22 }}>
            {lists.length !== 0 && <ProductsList lists={lists} />}
        </Box>
    );
};

export default Subscription;
