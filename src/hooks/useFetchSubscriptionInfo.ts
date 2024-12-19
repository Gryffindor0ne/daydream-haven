import { useEffect } from 'react';

import getSubscriptionDetailAPI from '~/api/getSubscriptionDetailAPI';
import { useAppDispatch } from '~/app/reduxHooks';

import { setLoading } from '~/features/auth/authSlice';
import { ProductInfo } from '~/types/product';

type FetchProductInfoProps = {
    subscriptionIds: string;
    setSubscriptionInfo: React.Dispatch<React.SetStateAction<ProductInfo[]>>;
};

const useFetchSubscriptionInfo = ({ subscriptionIds, setSubscriptionInfo }: FetchProductInfoProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchProductInfo = async () => {
            dispatch(setLoading(true));
            try {
                const response = await getSubscriptionDetailAPI(subscriptionIds);

                if (response) {
                    setSubscriptionInfo(response);
                }
            } catch (error) {
                console.error('Error fetching order info:', error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        if (subscriptionIds) {
            fetchProductInfo();
        }
    }, [dispatch, subscriptionIds, setSubscriptionInfo]);
};

export default useFetchSubscriptionInfo;
