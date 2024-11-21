import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fetchAllOrdersFailure, fetchAllOrdersSuccess, fetchAllOrdersRequest } from './allOrdersSlice';
import getAllOrdersAPI from '~/api/getAllOrdersAPI';
import { OrderDetailProps } from '~/features/payment/paymentSaga';
import { RootState } from '~/app/store';

const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated; // 인증 상태 확인

function* fetchAllOrdersSaga() {
    try {
        const isAuthenticated: boolean = yield select(selectIsAuthenticated);

        if (!isAuthenticated) {
            console.log('User is not authenticated');
            return;
        }

        // 항상 API 호출
        yield put(fetchAllOrdersRequest());
        const history: OrderDetailProps[] = yield call(getAllOrdersAPI);

        yield put(fetchAllOrdersSuccess(history));
    } catch (error) {
        if (error instanceof Error) {
            yield put(fetchAllOrdersFailure(error.message));
        } else {
            yield put(fetchAllOrdersFailure('An unknown error occurred'));
        }
    }
}

export function* watchOrderHistory() {
    yield takeLatest('allOrders/fetchAllOrders', fetchAllOrdersSaga);
}
