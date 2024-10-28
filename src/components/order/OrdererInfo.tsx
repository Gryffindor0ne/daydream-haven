import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { formattedPhoneNumber } from '~/utils/utils';

import useFetchUserData from '~/hooks/useFetchUserInfo';

export type UserInfoProps = {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    address: string | null;
};

const OrdererInfo = () => {
    const [userInfo, setUserInfo] = useState<UserInfoProps>();

    useFetchUserData({ setUserInfo });

    return (
        <>
            {userInfo && (
                <Box sx={{ marginY: 3, py: 3, bgcolor: '#ffffff' }}>
                    <Typography variant="h6" sx={{ display: 'flex', px: 5, pb: 3 }}>
                        주문자 정보
                    </Typography>
                    <Typography sx={{ fontSize: 20, fontFamily: 'Gowun Batang', display: 'flex', px: 5, py: 1 }}>
                        {userInfo?.name}
                    </Typography>
                    <Typography sx={{ fontSize: 16, fontFamily: 'Gowun Batang', display: 'flex', px: 5, py: 0.5 }}>
                        {formattedPhoneNumber(userInfo?.phoneNumber as string)}
                    </Typography>
                    <Typography sx={{ fontSize: 17, fontFamily: 'Gowun Batang', display: 'flex', px: 5, py: 0.5 }}>
                        {userInfo?.email}
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default OrdererInfo;
