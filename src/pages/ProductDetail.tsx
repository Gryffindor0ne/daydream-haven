import { useEffect, useState } from 'react';

import { Box, Container, Grid, Typography } from '@mui/material';

import { axiosInstance } from '~/lib/axiosInstance';
import ProductSelectBox from '~/components/product/ProductSelectBox';
import ProductInfoBox from '~/components/product/ProductInfoBox';
import SubscriptionInfoBox from '~/components/product/SubscriptionInfoBox';
import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';
import useScrollToTop from '~/hooks/useScrollToTop';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { ProductInfo } from '~/types/product';

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

    return (
        <Container maxWidth="xl">
            <Box sx={{ minHeight: '75vh', pt: isMobile ? 5 : 12, px: 2, mt: 10, mb: 20 }}>
                {isLoading ? (
                    <div></div>
                ) : (
                    <>
                        <Grid container spacing={2} sx={{ mb: 10 }}>
                            {/* <--------------------------------- 이미지 ---------------------------------------> */}

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

                            {/* <------------------------------------------------------------------------> */}

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

                                    {/* <-----------------------------상품 선택 상자-----------------------------------------> */}

                                    <ProductSelectBox product={listItem as ProductInfo} />
                                </Box>
                            </Grid>
                        </Grid>

                        {/* <-----------------------------------하단부----------------------------------> */}
                        <Box sx={{ p: isMobile ? 0 : 2 }}>
                            <Box sx={{ mb: 7 }}>
                                <Typography
                                    sx={{
                                        fontSize: 17,
                                        fontWeight: 700,
                                        my: 2,
                                        pl: 1,
                                    }}
                                >
                                    배송안내
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                    }}
                                >
                                    배송 방법: 택배
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                    }}
                                >
                                    배송 지역: 전국
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                    }}
                                >
                                    배송 비용: 조건부 무료. 주문 금액이 50,000원 미만일 때 배송비 3,000원을 추가합니다.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                    }}
                                >
                                    배송 기간: 3 ~ 7일
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                    }}
                                >
                                    배송 안내: 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는 경우가 생길 수
                                    있습니다.
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 7 }}>
                                <Typography
                                    sx={{
                                        fontSize: 17,
                                        fontWeight: 700,
                                        my: 2,
                                        pl: 1,
                                    }}
                                >
                                    입금확인안내
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                    }}
                                >
                                    무통장 입금시 72시간이 경과한 미입금 주문건은 자동으로 주문 취소됩니다.
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 7 }}>
                                <Typography
                                    sx={{
                                        fontSize: 17,
                                        fontWeight: 700,
                                        my: 2,
                                        pl: 1,
                                    }}
                                >
                                    교환/반품 안내
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 2,
                                        pl: 1,
                                    }}
                                >
                                    교환 및 반품이 가능한 경우
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                    }}
                                >
                                    - 상품을 공급 받으신 날로부터 7일이내. 단, 포장을 개봉하였거나 포장이 훼손되어
                                    상품의 가치가 훼손된 경우에는 교환/반품이 불가합니다.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                        mb: 5,
                                    }}
                                >
                                    - 공급 받으신 상품 및 용역의 내용이 표시, 광고의 내용과 다르거나 다르게 이행된
                                    경우에는 공급 받은 날로부터 3일 이내. 그 사실을 알게 된 날로부터 30일 이내.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 2,
                                        pl: 1,
                                    }}
                                >
                                    교환 및 반품이 불가능한 경우
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                    }}
                                >
                                    - 고객의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우. 단, 상품의 내용을
                                    확인하기 위해 포장 등을 훼손한 경우는 제외.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                    }}
                                >
                                    - 포장을 개봉하였거나 포장이 훼손되어 상품 가치가 상실된 경우.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                    }}
                                >
                                    - 고객의 사용 또는 일부 소비로 인해 상품의 가치가 현저히 감소한 경우.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                    }}
                                >
                                    - 시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가 현저시 감소한 경우.
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 7 }}>
                                <Typography
                                    sx={{
                                        fontSize: 17,
                                        fontWeight: 700,
                                        my: 2,
                                        pl: 1,
                                    }}
                                >
                                    환불안내
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                    }}
                                >
                                    환불시 반품 확인여부를 확인한 후 3 영업일 이내에 결제금액을 환불해 드립니다.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                    }}
                                >
                                    신용카드로 결제하신 경우는 신용카드 승인을 취소하여 결제대금이 청구되지 않게 합니다.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        my: 1,
                                        pl: 1,
                                    }}
                                >
                                    (단, 신용카드 결제일자에 맞추어 대금이 청구될 수 있으면 이 경우 익월 신용카드
                                    대금청구시 카드사에서 환급처리 됩니다.)
                                </Typography>
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default ProductDetail;
