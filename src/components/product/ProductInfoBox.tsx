import React from 'react';

import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import type { ProductInfo } from '~/types/product';
import { formatNumber } from '~/utils/number';

const Dot = styled('span')({
    width: '3px',
    height: '3px',
    backgroundColor: 'black',
    borderRadius: '50%',
    margin: '8px',
});

const DELIVERY_FEE_NOTICE = '3,000원 (50,000원 이상 구매 시 무료)';

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
    infoRow: {
        display: 'flex',
        my: 1.5,
    },
    label: (isMobile: boolean) => ({
        width: isMobile ? 90 : 120,
        fontSize: isMobile ? 14 : 16,
        pl: 1,
        mr: 3,
    }),
    value: (isMobile: boolean) => ({
        fontSize: isMobile ? 14 : 16,
        px: isMobile ? 0 : 1,
        wordBreak: 'break-word', // 단어 줄바꿈
    }),
    valueWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap', // 줄바꿈 허용
    },
};

interface InfoRowProps {
    label: string;
    isMobile: boolean;
    children: React.ReactNode;
}

const InfoRow = ({ label, isMobile, children }: InfoRowProps) => (
    <Box sx={styles.infoRow}>
        <Typography sx={styles.label(isMobile)}>{label}</Typography>
        <Box sx={styles.valueWrapper}>{children}</Box>
    </Box>
);

const ProductInfo = ({ item }: { item: ProductInfo }) => {
    const { isMobile } = useResponsiveLayout();

    const renderListWithDots = (items: string[]) => {
        return items.map((item, idx) => (
            <React.Fragment key={idx}>
                <Typography sx={styles.value(isMobile)}>{item}</Typography>
                {idx !== items.length - 1 && <Dot key={`dot-${idx}`} />}
            </React.Fragment>
        ));
    };

    return (
        <>
            <Typography sx={styles.title(isMobile)}>{item?.name}</Typography>
            <Typography sx={styles.price(isMobile)}>{`${formatNumber(item?.price)}원`}</Typography>

            <Box sx={styles.dividerWrapper}>
                <Divider sx={styles.divider} />
            </Box>

            <InfoRow label="원산지" isMobile={isMobile}>
                {renderListWithDots(item?.origin)}
            </InfoRow>

            <InfoRow label="로스팅 레벨" isMobile={isMobile}>
                <Typography sx={styles.value(isMobile)}>{item?.roastingLevel}</Typography>
            </InfoRow>

            <InfoRow label="플레이버" isMobile={isMobile}>
                {renderListWithDots(item?.flavor)}
            </InfoRow>

            <InfoRow label="용량" isMobile={isMobile}>
                <Typography sx={styles.value(isMobile)}>200g</Typography>
            </InfoRow>

            <InfoRow label="제조일" isMobile={isMobile}>
                <Typography sx={styles.value(isMobile)}>매주 월, 수, 금</Typography>
            </InfoRow>

            <InfoRow label="배송비" isMobile={isMobile}>
                <Typography sx={styles.value(isMobile)}>{DELIVERY_FEE_NOTICE}</Typography>
            </InfoRow>
        </>
    );
};

export default ProductInfo;
