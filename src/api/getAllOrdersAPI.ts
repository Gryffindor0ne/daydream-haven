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
        console.log(error);
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error('주문 내역이 존재하지 않습니다.');
            }
            throw new Error(error.response?.data?.message || '주문 내역 조회 중 오류가 발생했습니다.');
        }
        throw error;
    }
};
export default getAllOrdersAPI;
