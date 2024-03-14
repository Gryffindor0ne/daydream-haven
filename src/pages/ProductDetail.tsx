import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductInfo } from '~/components/ProductsList';
import { axiosInstance } from '~/lib/axiosInstance';
import ProductSelectBox from '~/components/ProductSelectBox';
import { formattedNumber } from '~/utils/utils';

const Dot = styled('span')({
    width: '2px',
    height: '2px',
    backgroundColor: 'black',
    borderRadius: '50%',
    margin: '0 8px',
});

const ProductDetail = () => {
    const { id } = useParams();
    const [lists, setLists] = useState<ProductInfo[]>([]);

    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.up('md'));

    const getLists = async () => {
        try {
            const { data } = await axiosInstance.get(`/shop`);
            setLists(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getLists();
    }, []);

    const getListItemById = (id: string) => {
        return lists.find((item) => item.id.toString() === id);
    };

    const listItem = getListItemById(id as string);

    return (
        <Box sx={{ minHeight: '75vh', paddingTop: 20, paddingX: 2, marginTop: 10, marginBottom: 20 }}>
            <Grid container spacing={2} sx={{ marginBottom: 20 }}>
                {/* <--------------------------------- 이미지 ---------------------------------------> */}

                <Grid item xs={12} sm={12} md={6}>
                    <Box
                        sx={{
                            maxWidth: '100%',
                            height: 'auto',
                            paddingX: isTablet ? 2 : 1,

                            '& img': {
                                width: '100%',
                                height: '100%',
                            },
                        }}
                    >
                        <img src={listItem?.product_detail_image[0]} alt={`product_${listItem?.name}`} />
                    </Box>
                </Grid>

                {/* <------------------------------------------------------------------------> */}

                <Grid item xs={12} sm={12} md={6}>
                    <Box
                        sx={{
                            paddingX: 5,
                            paddingY: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 25,
                                marginTop: isTablet ? 0 : 5,
                                marginBottom: 1,
                                paddingX: 2,
                            }}
                        >
                            {listItem?.name}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 15,
                                marginY: 1,
                                paddingX: 2,
                            }}
                        >
                            {`${formattedNumber(listItem?.price as number)}원`}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 3 }}>
                            <Divider
                                sx={{
                                    width: '95%',
                                }}
                            />
                        </Box>
                        {/* <------------------------------------------------------------------------> */}

                        <Box sx={{ display: 'flex', marginY: 1 }}>
                            <Typography
                                sx={{
                                    width: 120,
                                    fontSize: 13,
                                    marginY: 0.5,
                                    paddingLeft: 1,
                                }}
                            >
                                원산지
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                {listItem?.origin.map((country, idx) => (
                                    <React.Fragment key={idx}>
                                        <Typography
                                            sx={{
                                                fontSize: 13,
                                                marginY: 0.5,
                                                paddingX: 1,
                                            }}
                                        >
                                            {country}
                                        </Typography>
                                        {idx !== listItem.origin.length - 1 && <Dot key={`dot-${idx}`} />}
                                    </React.Fragment>
                                ))}
                            </Box>
                        </Box>
                        {/* <------------------------------------------------------------------------> */}
                        <Box sx={{ display: 'flex', marginY: 1 }}>
                            <Typography
                                sx={{
                                    width: 120,
                                    fontSize: 13,
                                    marginY: 0.5,
                                    paddingLeft: 1,
                                }}
                            >
                                로스팅 레벨
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    marginY: 0.5,
                                    paddingX: 1,
                                }}
                            >
                                {listItem?.roasting_level}
                            </Typography>
                        </Box>
                        {/* <------------------------------------------------------------------------> */}
                        <Box sx={{ display: 'flex', marginY: 1 }}>
                            <Typography
                                sx={{
                                    width: 120,
                                    fontSize: 13,
                                    marginY: 0.5,
                                    paddingLeft: 1,
                                }}
                            >
                                플레이버
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                {listItem?.flavor.map((taste, idx) => (
                                    <React.Fragment key={idx}>
                                        <Typography
                                            sx={{
                                                fontSize: 13,
                                                marginY: 0.5,
                                                paddingX: 1,
                                            }}
                                        >
                                            {taste}
                                        </Typography>
                                        {idx !== listItem.flavor.length - 1 && <Dot key={`dot_dot-${idx}`} />}
                                    </React.Fragment>
                                ))}
                            </Box>
                        </Box>
                        {/* <------------------------------------------------------------------------> */}
                        <Box sx={{ display: 'flex', marginY: 1 }}>
                            <Typography
                                sx={{
                                    width: 120,
                                    fontSize: 13,
                                    marginY: 0.5,
                                    paddingLeft: 1,
                                }}
                            >
                                용량
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    marginY: 0.5,
                                    paddingX: 1,
                                }}
                            >
                                200g
                            </Typography>
                        </Box>
                        {/* <------------------------------------------------------------------------> */}
                        <Box sx={{ display: 'flex', marginY: 1 }}>
                            <Typography
                                sx={{
                                    width: 120,
                                    fontSize: 13,
                                    marginY: 0.5,
                                    paddingLeft: 1,
                                }}
                            >
                                제조일
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    marginY: 0.5,
                                    paddingX: 1,
                                }}
                            >
                                매주 월, 수, 금
                            </Typography>
                        </Box>
                        {/* <------------------------------------------------------------------------> */}
                        <Box sx={{ display: 'flex', marginY: 1 }}>
                            <Typography
                                sx={{
                                    width: 120,
                                    fontSize: 13,
                                    marginY: 0.5,
                                    paddingLeft: 1,
                                }}
                            >
                                배송비
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    marginY: 0.5,
                                    paddingX: 1,
                                }}
                            >
                                {`${formattedNumber(listItem?.delivery_fee as number)}원  (50,000원 이상 구매 시 무료)`}
                            </Typography>
                        </Box>
                        {/* <-----------------------------상품 선택 상자-----------------------------------------> */}

                        <ProductSelectBox product={listItem as ProductInfo} />
                    </Box>
                </Grid>
            </Grid>

            {/* <-----------------------------------하단부----------------------------------> */}
            <Box sx={{ padding: 2, marginTop: 10 }}>
                <Box sx={{ marginBottom: 7 }}>
                    <Typography
                        sx={{
                            fontSize: 17,
                            fontWeight: 700,
                            marginY: 2,
                            paddingLeft: 1,
                        }}
                    >
                        배송안내
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                        }}
                    >
                        배송 방법: 택배
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                        }}
                    >
                        배송 지역: 전국
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                        }}
                    >
                        배송 비용: 조건부 무료. 주문 금액이 50,000원 미만일 때 배송비 3,000원을 추가합니다.
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                        }}
                    >
                        배송 기간: 3 ~ 7일
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                        }}
                    >
                        배송 안내: 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는 경우가 생길 수 있습니다.
                    </Typography>
                </Box>
                <Box sx={{ marginBottom: 7 }}>
                    <Typography
                        sx={{
                            fontSize: 17,
                            fontWeight: 700,
                            marginY: 2,
                            paddingLeft: 1,
                        }}
                    >
                        입금확인안내
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                        }}
                    >
                        무통장 입금시 72시간이 경과한 미입금 주문건은 자동으로 주문 취소됩니다.
                    </Typography>
                </Box>
                <Box sx={{ marginBottom: 7 }}>
                    <Typography
                        sx={{
                            fontSize: 17,
                            fontWeight: 700,
                            marginY: 2,
                            paddingLeft: 1,
                        }}
                    >
                        교환/반품 안내
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 2,
                            paddingLeft: 1,
                        }}
                    >
                        교환 및 반품이 가능한 경우
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                        }}
                    >
                        - 상품을 공급 받으신 날로부터 7일이내. 단, 포장을 개봉하였거나 포장이 훼손되어 상품의 가치가
                        훼손된 경우에는 교환/반품이 불가합니다.
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                            marginBottom: 5,
                        }}
                    >
                        - 공급 받으신 상품 및 용역의 내용이 표시, 광고의 내용과 다르거나 다르게 이행된 경우에는 공급
                        받은 날로부터 3일 이내. 그 사실을 알게 된 날로부터 30일 이내.
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 2,
                            paddingLeft: 1,
                        }}
                    >
                        교환 및 반품이 불가능한 경우
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                        }}
                    >
                        - 고객의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우. 단, 상품의 내용을 확인하기 위해 포장
                        등을 훼손한 경우는 제외.
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                        }}
                    >
                        - 포장을 개봉하였거나 포장이 훼손되어 상품 가치가 상실된 경우.
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                        }}
                    >
                        - 고객의 사용 또는 일부 소비로 인해 상품의 가치가 현저히 감소한 경우.
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                        }}
                    >
                        - 시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가 현저시 감소한 경우.
                    </Typography>
                </Box>
                <Box sx={{ marginBottom: 7 }}>
                    <Typography
                        sx={{
                            fontSize: 17,
                            fontWeight: 700,
                            marginY: 2,
                            paddingLeft: 1,
                        }}
                    >
                        환불안내
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                        }}
                    >
                        환불시 반품 확인여부를 확인한 후 3 영업일 이내에 결제금액을 환불해 드립니다.
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                        }}
                    >
                        신용카드로 결제하신 경우는 신용카드 승인을 취소하여 결제대금이 청구되지 않게 합니다.
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            marginY: 1,
                            paddingLeft: 1,
                        }}
                    >
                        (단, 신용카드 결제일자에 맞추어 대금이 청구될 수 있으면 이 경우 익월 신용카드 대금청구시
                        카드사에서 환급처리 됩니다.)
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetail;
