import { axiosInstance } from '~/lib/axiosInstance';
import { extractAccessTokenFromCookie } from '~/utils/cookiesUtils';

const getUserInfoDetailAPI = async () => {
    const accessToken = extractAccessTokenFromCookie();

    try {
        const { data } = await axiosInstance.get(`/users`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};
export default getUserInfoDetailAPI;
