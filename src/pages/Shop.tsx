import { useCallback, useEffect, useState } from 'react';

import { Box, Container } from '@mui/material';

import getProductsAPI from '~/api/getProductsAPI';

import { useAppDispatch } from '~/app/reduxHooks';
import ProductsList from '~/components/product/ProductsList';
import { setLoading } from '~/features/auth/authSlice';

import useScrollToTop from '~/hooks/useScrollToTop';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';

const Shop = () => {
    const dispatch = useAppDispatch();
    const [products, setProducts] = useState([]);
    const { isMobile } = useResponsiveLayout();

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
        <Container maxWidth="xl">
            <Box sx={{ minHeight: '75vh', pt: isMobile ? 5 : 12, mt: 10, mb: 22 }}>
                {products.length !== 0 && <ProductsList lists={products} />}
            </Box>
        </Container>
    );
};

export default Shop;
