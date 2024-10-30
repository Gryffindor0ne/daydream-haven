import { useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import { useAppDispatch } from '~/app/reduxHooks';
import ProductsList from '~/components/product/ProductsList';
import { setLoading } from '~/features/auth/authSlice';

import useScrollToTop from '~/hooks/useScrollToTop';
import getProductsAPI from '~/api/getProductsAPI';

const Shop = () => {
    const dispatch = useAppDispatch();
    const [products, setProducts] = useState([]);

    useScrollToTop();

    const getProducts = useCallback(async () => {
        dispatch(setLoading(true));

        try {
            const data = await getProductsAPI();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            dispatch(setLoading(false)); // 비동기 작업 완료 후 항상 로딩 상태를 false로 설정합니다.
        }
    }, [dispatch]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <Box sx={{ minHeight: '75vh', paddingTop: 12, paddingX: 2, marginTop: 10, marginBottom: 22 }}>
            {products.length !== 0 && <ProductsList lists={products} />}
        </Box>
    );
};

export default Shop;
