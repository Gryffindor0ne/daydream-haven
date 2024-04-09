import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '~/app/reduxHooks';
import { setLoading } from '~/features/auth/authSlice';
import { axiosInstance } from '~/lib/axiosInstance';
import { extractAccessTokenFromCookie } from '~/utils/cookiesUtils';
import { formattedPhoneNumber } from '~/utils/utils';

type UserInfoProps = {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    address: string | null;
};

const OrdererInfo = () => {
    const accessToken = extractAccessTokenFromCookie();

    const dispatch = useAppDispatch();
    const [userInfo, setUserInfo] = useState<UserInfoProps>();

    const getUserInfo = useCallback(async () => {
        dispatch(setLoading(true));

        try {
            const { data } = await axiosInstance.get(`/users`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setUserInfo(data);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false)); // 비동기 작업 완료 후 항상 로딩 상태를 false로 설정합니다.
        }
    }, [accessToken, dispatch]);

    useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

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
