import { takeLatest, call, put } from 'redux-saga/effects';

import { setLoading, setAuthenticated } from './authSlice';
import { AccessTokenValidityResponse, checkAccessTokenValidityAPI } from '~/api/checkAccessTokenValidityAPI';
import { extractAccessTokenFromCookie, removeAccessTokenFromCookie } from '~/utils/cookiesUtils';
import { clearOrder } from '~/features/order/orderSlice';

function* checkTokenExpirationSaga() {
    const accessToken = extractAccessTokenFromCookie();

    if (accessToken === null) {
        yield put(setAuthenticated(false));
        yield put(setLoading(false)); // 로딩 상태를 false로 설정
        return; // 사가 종료
    }
    try {
        yield put(setLoading(true)); // 로딩 상태를 true로 설정
        const response: AccessTokenValidityResponse = yield call(checkAccessTokenValidityAPI, accessToken); // 토큰 유효성 검사

        yield put(setAuthenticated(response.isAuthenticated)); // 인증 상태 업데이트
    } catch (error) {
        console.error('Error checking token validity:', error);
    } finally {
        yield put(setLoading(false)); // 로딩 상태를 false로 설정
    }
}

function* logoutUserSaga() {
    try {
        yield call(removeAccessTokenFromCookie); // 쿠키에서 액세스토큰 삭제
        yield put(setAuthenticated(false)); // 인증 상태를 false로 업데이트
        yield put(clearOrder()); // 주문리스트 상태 초기화 업데이트
    } catch (error) {
        console.error('Error logging out user:', error);
    }
}

// 토큰 체크 액션을 감시하고, 토큰 체크 액션이 발생할 때마다 checkTokenExpirationSaga를 실행합니다.
export function* watchCheckTokenExpiration() {
    yield takeLatest('auth/checkTokenExpiration', checkTokenExpirationSaga);
}

// 로그아웃 액션을 감시하고, 로그아웃 액션이 발생할 때마다 logoutUserSaga를 실행합니다.
export function* watchLogoutUser() {
    yield takeLatest('auth/logoutUser', logoutUserSaga);
}
