import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { findPriceByCapacityAndPeriod, formattedNumber } from '~/utils/utils';
import { ProductInfo } from '~/components/product/ProductsList';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';

const SubscriptionInfoBox = ({ item }: { item: ProductInfo | undefined }) => {
    const { isMobile } = useResponsiveLayout();

    if (!item) {
        return null;
    }

    const price200 = findPriceByCapacityAndPeriod(item, '200', 1);

    return (
        <>
            <Typography
                sx={{
                    fontSize: isMobile ? 18 : 25,
                    mb: 1,
                    px: 2,
                }}
            >
                {item?.name}
            </Typography>
            {price200 !== 0 && (
                <Typography
                    sx={{
                        fontSize: 15,
                        my: 1,
                        px: 2,
                    }}
                >
                    {`${formattedNumber(price200 as number)}원`}
                </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
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
                    my: 0.5,
                    pl: 1,
                }}
            >
                {`Daydream Haven의 블랜드 ${item.productComposition!.length}종을 매주 목요일 배송합니다.`}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                <Divider
                    sx={{
                        width: '95%',
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', my: 1 }}>
                {item.productComposition?.map((product, idx) => (
                    <Typography
                        key={idx}
                        sx={{
                            fontSize: 13,
                            my: 0.5,
                            px: 1,
                        }}
                    >
                        {product}
                    </Typography>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
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
