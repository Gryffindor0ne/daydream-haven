import { axiosInstance } from '~/lib/axiosInstance';
import { extractAccessTokenFromCookie } from '~/utils/cookiesUtils';

const checkOrderDetailAPI = async (paymentId: string) => {
    const accessToken = extractAccessTokenFromCookie();

    try {
        const response = await axiosInstance.get(`orders/${paymentId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response;
    } catch (error) {
        throw new Error('주문 내역 확인 불가');
    }
};

export default checkOrderDetailAPI;
