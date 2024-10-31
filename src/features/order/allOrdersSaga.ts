import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchAllOrdersFailure, fetchAllOrdersSuccess, fetchAllOrdersRequest } from './allOrdersSlice';
import getAllOrdersAPI from '~/api/getAllOrdersAPI';
import { PaymentDataProps } from '~/features/payment/paymentSaga';

function* fetchAllOrdersSaga() {
    try {
        yield put(fetchAllOrdersRequest());
        const history: PaymentDataProps[] = yield call(getAllOrdersAPI);
        yield put(fetchAllOrdersSuccess(history));
    } catch (error) {
        yield put(fetchAllOrdersFailure('Failed to fetch order history'));
    }
}

export function* watchOrderHistory() {
    yield takeLatest('allOrders/fetchAllOrders', fetchAllOrdersSaga);
}
