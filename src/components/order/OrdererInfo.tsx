import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';

import { formattedPhoneNumber } from '~/utils/utils';

export type UserInfoProps = {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    address: string | null;
    totalPurchaseAmount: number;
    totalPurchaseCount: number;
};

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
                <Typography sx={contentStyle}>{formattedPhoneNumber(userInfo?.phoneNumber as string)}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography sx={contentStyle}>{userInfo?.email}</Typography>
            </Grid>
        </Grid>
    );
};

export default OrdererInfo;
