import axios from 'axios';
import { axiosInstance } from '~/lib/axiosInstance';
import { extractAccessTokenFromCookie } from '~/utils/cookiesUtils';

const getSubscriptionDetailAPI = async (ids: string) => {
    const accessToken = extractAccessTokenFromCookie();

    try {
        const { data } = await axiosInstance.get(`/subscriptions?ids=${ids}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return data;
    } catch (error) {
        let message = '상품 정보 조회 중 오류가 발생했습니다.';

        if (axios.isAxiosError(error) && error.response) {
            message = error.response.status === 404 ? '상품을 찾을 수 없습니다.' : message; // 기본 메시지를 사용
        }
        throw new Error(message);
    }
};
export default getSubscriptionDetailAPI;
