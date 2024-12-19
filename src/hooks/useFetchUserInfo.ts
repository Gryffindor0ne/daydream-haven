import { useEffect } from 'react';

import getUserDetailsAPI from '~/api/getUserDetailsAPI';
import { useAppDispatch } from '~/app/reduxHooks';
import { UserInfoProps } from '~/types/user';

type FetchUserInfoProps = {
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfoProps | undefined>>;
};

const useFetchUserInfo = ({ setUserInfo }: FetchUserInfoProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userData = await getUserDetailsAPI();
                setUserInfo(userData);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [dispatch, setUserInfo]);
};

export default useFetchUserInfo;
