import axios from 'axios';
import { axiosInstance } from '~/lib/axiosInstance';
import { LoginInfo } from '~/types/user';

const getLoginToken = async ({ email, password }: LoginInfo) => {
    try {
        const response = await axiosInstance.post(`users/sign-in`, {
            email,
            password,
        });
        return response;
    } catch (error) {
        const message =
            axios.isAxiosError(error) && error.response
                ? error.response.status === 401 // 예: 잘못된 로그인 정보
                    ? '이메일 또는 비밀번호가 올바르지 않습니다.'
                    : error.response.status === 404 // 예: 경로가 잘못된 경우
                      ? '서버에 연결할 수 없습니다.'
                      : '로그인 요청 중 오류가 발생했습니다.'
                : '네트워크 오류가 발생했습니다.';

        throw new Error(message);
    }
};

export default getLoginToken;
