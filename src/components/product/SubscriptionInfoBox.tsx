import { Box, Divider, Typography } from '@mui/material';

import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { findPriceByCapacityAndPeriod } from '~/utils/product';
import { ProductInfo } from '~/types/product';
import { formatNumber } from '~/utils/number';

const styles = {
    title: (isMobile: boolean) => ({
        fontSize: isMobile ? 18 : 25,
        mb: 1,
        px: 2,
    }),
    price: (isMobile: boolean) => ({
        fontSize: isMobile ? 17 : 22,
        my: 1,
        px: 2,
    }),
    dividerWrapper: {
        display: 'flex',
        justifyContent: 'center',
        my: 3,
    },
    divider: {
        width: '95%',
    },
    description: (isMobile: boolean) => ({
        fontSize: isMobile ? 14 : 16,
        my: 0.5,
        pl: 1,
    }),
    compositionItem: (isMobile: boolean) => ({
        fontSize: isMobile ? 14 : 16,
        my: 0.5,
        px: 1,
    }),
    compositionWrapper: {
        display: 'flex',
        flexDirection: 'column',
        my: 1,
    },
};

const DividerSection = () => (
    <Box sx={styles.dividerWrapper}>
        <Divider sx={styles.divider} />
    </Box>
);

const SubscriptionInfoBox = ({ item }: { item: ProductInfo }) => {
    const { isMobile } = useResponsiveLayout();

    if (!item) {
        return null;
    }

    const price200 = findPriceByCapacityAndPeriod(item, '200', 1) || 0;

    return (
        <>
            <Typography sx={styles.title(isMobile)}>{item.name}</Typography>

            {price200 !== 0 && <Typography sx={styles.price(isMobile)}>{`${formatNumber(price200)}원`}</Typography>}

            <DividerSection />

            <Typography sx={styles.description(isMobile)}>
                {`Daydream Haven의 블랜드 ${item.productComposition?.length}종을 매주 목요일 배송합니다.`}
            </Typography>

            <DividerSection />

            <Box sx={styles.compositionWrapper}>
                {item.productComposition?.map((product, idx) => (
                    <Typography key={idx} sx={styles.compositionItem(isMobile)}>
                        {product}
                    </Typography>
                ))}
            </Box>

            <DividerSection />
        </>
    );
};

export default SubscriptionInfoBox;
