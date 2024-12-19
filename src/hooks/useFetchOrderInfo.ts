import { useEffect } from 'react';

import getOrderDetailsAPI from '~/api/getOrderDetailsAPI';
import { useAppDispatch } from '~/app/reduxHooks';
import { setLoading } from '~/features/auth/authSlice';
import { OrderDetailProps } from '~/types/order';

type FetchOrderInfoProps = {
    id: string;
    setOrderInfo: React.Dispatch<React.SetStateAction<OrderDetailProps | undefined>>;
};

const useFetchOrderInfo = ({ id, setOrderInfo }: FetchOrderInfoProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchOrderInfo = async () => {
            dispatch(setLoading(true));
            try {
                const response = await getOrderDetailsAPI(id);
                if (response && response.data) {
                    setOrderInfo(response.data);
                }
            } catch (error) {
                console.error('Error fetching order info:', error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        if (id) {
            fetchOrderInfo();
        }
    }, [dispatch, id, setOrderInfo]);
};

export default useFetchOrderInfo;
