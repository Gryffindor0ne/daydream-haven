export const setAccessTokenCookie = (accessToken: string) => {
    // 액세스 토큰을 쿠키에 저장
    document.cookie = `access_token=${accessToken}; path=/`;
};

export const removeAccessTokenFromCookie = () => {
    const token = extractAccessTokenFromCookie();

    if (token) {
        // 만료일을 현재 시간보다 이전으로 설정하여 쿠키를 만료시킴
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } else {
        throw new Error('Access token is null');
    }
};

export const extractAccessTokenFromCookie = () => {
    const cookieString = document.cookie;
    const accessTokenRegex = /access_token=([^;]+)/;
    const match = accessTokenRegex.exec(cookieString);
    return match ? match[1] : null;
};
