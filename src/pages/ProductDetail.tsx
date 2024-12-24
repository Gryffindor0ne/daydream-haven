import { useEffect, useState } from 'react';

import { Box, Container, Grid } from '@mui/material';

import { axiosInstance } from '~/lib/axiosInstance';
import ProductSelectBox from '~/components/product/ProductSelectBox';
import ProductInfoBox from '~/components/product/ProductInfoBox';
import SubscriptionInfoBox from '~/components/product/SubscriptionInfoBox';
import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';
import useScrollToTop from '~/hooks/useScrollToTop';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { ProductInfo } from '~/types/product';
import ShippingInfo from '~/components/product/ShippingInfo';

const ProductDetail = () => {
    const { currentPath, id } = useCurrentPathAndId();

    const [listItem, setListItem] = useState<ProductInfo | undefined>();
    const [isLoading, setIsLoading] = useState(true);

    const { isMobile, isTablet } = useResponsiveLayout();

    useEffect(() => {
        const getLists = async () => {
            try {
                const path = currentPath === 'shop' ? 'products' : 'subscriptions';
                const { data } = await axiosInstance.get(`/${path}/${id}`);

                setListItem(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getLists();
    }, [currentPath, id]);

    useScrollToTop();

    if (isLoading) return <Box sx={{ minHeight: '120vh' }}></Box>;

    return (
        <Container maxWidth="xl">
            <Box sx={{ minHeight: '75vh', pt: isMobile ? 5 : 12, mt: 10, mb: 20 }}>
                <>
                    <Grid container spacing={2} sx={{ mb: 10 }}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Box
                                sx={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    px: isTablet ? 2 : 1,

                                    '& img': {
                                        width: '100%',
                                        height: '100%',
                                    },
                                }}
                            >
                                <img src={listItem?.detailImages[0]} alt={`product_${listItem?.name}`} />
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <Box
                                sx={{
                                    px: isMobile ? 1 : 5,
                                    py: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                {currentPath === 'shop' ? (
                                    <ProductInfoBox item={listItem as ProductInfo} />
                                ) : (
                                    <SubscriptionInfoBox item={listItem as ProductInfo} />
                                )}

                                <ProductSelectBox product={listItem as ProductInfo} />
                            </Box>
                        </Grid>
                    </Grid>

                    <ShippingInfo />
                </>
            </Box>
        </Container>
    );
};

export default ProductDetail;
