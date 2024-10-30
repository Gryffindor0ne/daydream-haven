import axios from 'axios';
import { axiosInstance } from '~/lib/axiosInstance';
import { extractAccessTokenFromCookie } from '~/utils/cookiesUtils';

const getOrderDetailsAPI = async (paymentId: string) => {
    const accessToken = extractAccessTokenFromCookie();

    try {
        const response = await axiosInstance.get(`orders/${paymentId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response;
    } catch (error) {
        const message =
            axios.isAxiosError(error) && error.response
                ? error.response.status === 404
                    ? '주문 내역이 존재하지 않습니다.'
                    : '주문 내역 확인 중 오류가 발생했습니다.'
                : '네트워크 오류가 발생했습니다.';

        throw new Error(message);
    }
};

export default getOrderDetailsAPI;
