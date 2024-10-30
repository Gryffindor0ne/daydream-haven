import axios from 'axios';
import { axiosInstance } from '~/lib/axiosInstance';
import { extractAccessTokenFromCookie } from '~/utils/cookiesUtils';

const getUserDetailsAPI = async () => {
    const accessToken = extractAccessTokenFromCookie();

    try {
        const { data } = await axiosInstance.get(`/users`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return data;
    } catch (error) {
        let message = '사용자 정보 조회 중 오류가 발생했습니다.';

        if (axios.isAxiosError(error) && error.response) {
            message = error.response.status === 404 ? '사용자를 찾을 수 없습니다.' : message; // 기본 메시지를 사용
        }
        throw new Error(message);
    }
};
export default getUserDetailsAPI;
