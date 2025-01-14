import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { fetchData, paymentFailure, paymentSuccess } from '~/features/payment/paymentSlice';
import getOrderDetailsAPI from '~/api/getOrderDetailsAPI';
import { PaymentApiResponse, PaymentProps } from '~/types/order';

// 폴링을 위한 saga 로직
function* paymentStateSaga(action: PaymentProps) {
    try {
        while (true) {
            yield put(fetchData()); // 로딩 상태를 true로 설정
            const response: PaymentApiResponse = yield call(getOrderDetailsAPI, action.paymentId);

            if (response.data.status === 'completed') {
                yield put(paymentSuccess()); // 성공 액션 디스패치
                break; // 폴링 중단
            } else if (response.data.status === 'pending') {
                // 상태가 'pending'인 경우 3초 후에 다시 요청
                yield delay(3000);
            } else {
                // 기타 실패처리
                yield put(paymentFailure('Payment is canceled or failed!'));
                break; // 폴링 중단
            }
        }
    } catch (error) {
        yield put(paymentFailure(error)); // 실패 액션 디스패치
    }
}

export function* paymentSaga() {
    yield takeLatest('payment/paymentState', paymentStateSaga);
}

export default paymentSaga;
