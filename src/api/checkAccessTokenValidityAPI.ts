import { axiosInstance } from '~/lib/axiosInstance';

export interface AccessTokenValidityResponse {
    isAuthenticated: boolean;
}

export const checkAccessTokenValidityAPI = async (accessToken: string): Promise<AccessTokenValidityResponse> => {
    try {
        const response = await axiosInstance.post(
            '/users/auth',
            null, // 요청 바디가 필요 없는 경우
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        return response.data;
    } catch (error) {
        throw new Error('액세스 토큰 유효성 확인 실패');
    }
};
