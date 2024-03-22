import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useMediaQuery, useTheme } from '@mui/material';

import { findPriceByCapacityAndPeriod, formattedNumber } from '~/utils/utils';
import { ProductInfo } from '~/components/ProductsList';

const SubscriptionInfoBox = ({ item }: { item: ProductInfo | undefined }) => {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.up('md'));

    if (!item) {
        return null;
    }

    const price200 = findPriceByCapacityAndPeriod(item, '200', 1);

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
            {price200 !== 0 && (
                <Typography
                    sx={{
                        fontSize: 15,
                        marginY: 1,
                        paddingX: 2,
                    }}
                >
                    {`${formattedNumber(price200 as number)}원`}
                </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 3 }}>
                <Divider
                    sx={{
                        width: '95%',
                    }}
                />
            </Box>

            {/* <------------------------------------------------------------------------> */}
            <Typography
                sx={{
                    fontSize: 13,
                    marginY: 0.5,
                    paddingLeft: 1,
                }}
            >
                {`Daydream Haven의 블랜드 ${item.product_composition!.length}종을 매주 목요일 배송합니다.`}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 3 }}>
                <Divider
                    sx={{
                        width: '95%',
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', marginY: 1 }}>
                {item.product_composition?.map((product, idx) => (
                    <Typography
                        key={idx}
                        sx={{
                            fontSize: 13,
                            marginY: 0.5,
                            paddingX: 1,
                        }}
                    >
                        {product}
                    </Typography>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 3 }}>
                <Divider
                    sx={{
                        width: '95%',
                    }}
                />
            </Box>
        </>
    );
};

export default SubscriptionInfoBox;
