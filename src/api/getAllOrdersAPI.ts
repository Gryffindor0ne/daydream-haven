import axios from 'axios';
import { axiosInstance } from '~/lib/axiosInstance';
import { extractAccessTokenFromCookie } from '~/utils/cookiesUtils';

const getAllOrdersAPI = async () => {
    const accessToken = extractAccessTokenFromCookie();

    try {
        const { data } = await axiosInstance.get(`/orders`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return data;
    } catch (error) {
        let message = '주문 내역 조회 중 오류가 발생했습니다.';

        if (axios.isAxiosError(error) && error.response) {
            message = error.response.status === 404 ? '주문 내역이 존재하지 않습니다.' : message; // 기본 메시지 유지
        }

        throw new Error(message);
    }
};
export default getAllOrdersAPI;
