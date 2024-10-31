import { useEffect } from 'react';

import getUserDetailsAPI from '~/api/getUserDetailsAPI';
import { setLoading } from '~/features/auth/authSlice';
import { useAppDispatch } from '~/app/reduxHooks';
import { UserInfoProps } from '~/components/order/OrdererInfo';

type FetchUserInfoProps = {
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfoProps | undefined>>;
};

const useFetchUserInfo = ({ setUserInfo }: FetchUserInfoProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchUserInfo = async () => {
            dispatch(setLoading(true));
            try {
                const userData = await getUserDetailsAPI();
                setUserInfo(userData);
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchUserInfo();
    }, [dispatch, setUserInfo]);
};

export default useFetchUserInfo;