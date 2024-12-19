import { useEffect } from 'react';

import getProductDetailAPI from '~/api/getProductDetailAPI';
import { useAppDispatch } from '~/app/reduxHooks';

import { setLoading } from '~/features/auth/authSlice';
import { ProductInfo } from '~/types/product';

type FetchProductInfoProps = {
    productIds: string;
    setProductInfo: React.Dispatch<React.SetStateAction<ProductInfo[]>>;
};

const useFetchProductInfo = ({ productIds, setProductInfo }: FetchProductInfoProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchProductInfo = async () => {
            dispatch(setLoading(true));
            try {
                const response = await getProductDetailAPI(productIds);

                if (response) {
                    setProductInfo(response);
                }
            } catch (error) {
                console.error('Error fetching order info:', error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        if (productIds) {
            fetchProductInfo();
        }
    }, [dispatch, productIds, setProductInfo]);
};

export default useFetchProductInfo;
