import { Grid, Typography } from '@mui/material';

import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { UserInfoProps } from '~/types/user';
import { formatPhoneNumber } from '~/utils/phone';

const OrdererInfo = ({ userInfo }: { userInfo: UserInfoProps }) => {
    const { isMobile } = useResponsiveLayout();

    const contentStyle = {
        px: 4,
        py: 0.5,
        fontSize: isMobile ? 12 : 16,
        fontFamily: 'Gowun Batang',
    };

    return (
        <Grid container sx={{ my: 3, py: 3, bgcolor: '#ffffff' }}>
            <Grid item xs={12}>
                <Typography sx={{ px: 3, pb: 2, fontSize: isMobile ? 15 : 20 }}>주문자 정보</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography sx={contentStyle}>{userInfo?.name}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography sx={contentStyle}>{formatPhoneNumber(userInfo?.phoneNumber as string)}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography sx={contentStyle}>{userInfo?.email}</Typography>
            </Grid>
        </Grid>
    );
};

export default OrdererInfo;
