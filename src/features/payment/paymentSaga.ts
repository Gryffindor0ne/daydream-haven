import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { AxiosRequestConfig } from 'axios';

import { fetchData, paymentFailure, paymentSuccess } from '~/features/payment/paymentSlice';
import getOrderDetailsAPI from '~/api/getOrderDetailsAPI';
import { OrderItemSummaryInfo } from '~/components/product/ProductSelectBox';

type PaymentProps = {
    paymentId: string;
    type: string;
};

export interface AxiosResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string | string[]>;
    config: AxiosRequestConfig;
    request: XMLHttpRequest;
}

export interface PaymentInfo {
    paymentMethod: string;
    cashReceiptRequired: boolean;
    issuanceNumber: string;
    cashReceiptRecipientName: string | null;
    accountHolderName: string | null;
}

interface DeliveryInfo {
    name: string;
    address: string;
    addressDetail: string;
    postcode: string;
}

export interface PaymentDataProps {
    id: string;
    status: string;
    items: OrderItemSummaryInfo[];
    paymentInfo: PaymentInfo;
    deliveryInfo: DeliveryInfo;
    createdAt: string;
    updatedAt: string;
}

type PaymentApiResponse = AxiosResponse<PaymentDataProps>;

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
