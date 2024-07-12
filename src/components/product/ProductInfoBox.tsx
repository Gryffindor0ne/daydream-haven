import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

import { formattedNumber } from '~/utils/utils';
import type { ProductInfo } from '~/components/product/ProductsList';

const Dot = styled('span')({
    width: '2px',
    height: '2px',
    backgroundColor: 'black',
    borderRadius: '50%',
    margin: '0 8px',
});

const ProductInfo = ({ item }: { item: ProductInfo }) => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.up('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const flavor = item?.flavor;
    const deliveryFeeNotice = `3,000원 (50,000원 이상 구매 시 무료)`;

    return (
        <>
            <Typography
                sx={{
                    fontSize: 25,
                    marginTop: isTablet ? 0 : 5,
                    marginBottom: 1,
                    paddingX: 2,
                }}
            >
                {item?.name}
            </Typography>
            <Typography
                sx={{
                    fontSize: 15,
                    marginY: 1,
                    paddingX: 2,
                }}
            >
                {`${formattedNumber(item?.price as number)}원`}
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
                        width: isMobile ? 100 : 120,
                        fontSize: isMobile ? 11 : 13,
                        marginY: 0.5,
                        paddingLeft: 1,
                    }}
                >
                    원산지
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {item?.origin.map((country, idx) => (
                        <React.Fragment key={idx}>
                            <Typography
                                sx={{
                                    fontSize: isMobile ? 11 : 13,
                                    marginY: 0.5,
                                    paddingX: isMobile ? 0 : 1,
                                }}
                            >
                                {country}
                            </Typography>
                            {idx !== item.origin.length - 1 && <Dot key={`dot-${idx}`} />}
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
            {/* <------------------------------------------------------------------------> */}
            <Box sx={{ display: 'flex', marginY: 1 }}>
                <Typography
                    sx={{
                        width: isMobile ? 100 : 120,
                        fontSize: isMobile ? 11 : 13,
                        marginY: 0.5,
                        paddingLeft: 1,
                    }}
                >
                    로스팅 레벨
                </Typography>

                <Typography
                    sx={{
                        fontSize: isMobile ? 11 : 13,
                        marginY: 0.5,
                        paddingX: isMobile ? 0 : 1,
                    }}
                >
                    {item?.roastingLevel}
                </Typography>
            </Box>
            {/* <------------------------------------------------------------------------> */}
            <Box sx={{ display: 'flex', marginY: 1 }}>
                <Typography
                    sx={{
                        width: isMobile ? 100 : 120,
                        fontSize: isMobile ? 11 : 13,
                        marginY: 0.5,
                        paddingLeft: 1,
                    }}
                >
                    플레이버
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {flavor.map((taste, idx) => (
                        <React.Fragment key={idx}>
                            <Typography
                                sx={{
                                    fontSize: isMobile ? 11 : 13,
                                    marginY: 0.5,
                                    paddingX: isMobile ? 0 : 1,
                                }}
                            >
                                {taste}
                            </Typography>
                            {idx !== flavor.length - 1 && <Dot key={`dot_dot-${idx}`} />}
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
            {/* <------------------------------------------------------------------------> */}
            <Box sx={{ display: 'flex', marginY: 1 }}>
                <Typography
                    sx={{
                        width: isMobile ? 100 : 120,
                        fontSize: isMobile ? 11 : 13,
                        marginY: 0.5,
                        paddingLeft: 1,
                    }}
                >
                    용량
                </Typography>

                <Typography
                    sx={{
                        fontSize: isMobile ? 11 : 13,
                        marginY: 0.5,
                        paddingX: isMobile ? 0 : 1,
                    }}
                >
                    200g
                </Typography>
            </Box>
            {/* <------------------------------------------------------------------------> */}
            <Box sx={{ display: 'flex', marginY: 1 }}>
                <Typography
                    sx={{
                        width: isMobile ? 100 : 120,
                        fontSize: isMobile ? 11 : 13,
                        marginY: 0.5,
                        paddingLeft: 1,
                    }}
                >
                    제조일
                </Typography>

                <Typography
                    sx={{
                        fontSize: isMobile ? 11 : 13,
                        marginY: 0.5,
                        paddingX: isMobile ? 0 : 1,
                    }}
                >
                    매주 월, 수, 금
                </Typography>
            </Box>
            {/* <------------------------------------------------------------------------> */}
            <Box sx={{ display: 'flex', marginY: 1 }}>
                <Typography
                    sx={{
                        width: isMobile ? 100 : 120,
                        fontSize: isMobile ? 11 : 13,
                        marginY: 0.5,
                        paddingLeft: 1,
                    }}
                >
                    배송비
                </Typography>

                <Typography
                    sx={{
                        fontSize: isMobile ? 11 : 13,
                        marginY: 0.5,
                        paddingX: isMobile ? 0 : 1,
                    }}
                >
                    {deliveryFeeNotice}
                </Typography>
            </Box>
        </>
    );
};

export default ProductInfo;
