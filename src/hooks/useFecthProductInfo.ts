import { useEffect } from 'react';
import getProductDetailAPI from '~/api/getProductDetailAPI';
import { useAppDispatch } from '~/app/reduxHooks';
import { ProductInfo } from '~/components/product/ProductsList';
import { setLoading } from '~/features/auth/authSlice';

type FetchProductInfoProps = {
    ids: string;
    setProductInfo: React.Dispatch<React.SetStateAction<ProductInfo[]>>;
};

const useFetchProductInfo = ({ ids, setProductInfo }: FetchProductInfoProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchProductInfo = async () => {
            dispatch(setLoading(true));
            try {
                const response = await getProductDetailAPI(ids);

                if (response) {
                    setProductInfo(response);
                }
            } catch (error) {
                console.error('Error fetching order info:', error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        if (ids) {
            fetchProductInfo();
        }
    }, [dispatch, ids, setProductInfo]);
};

export default useFetchProductInfo;
