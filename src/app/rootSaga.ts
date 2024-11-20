import { all } from 'redux-saga/effects';
import { watchCheckTokenExpiration, watchLogoutUser } from '~/features/auth/authSaga';
import { watchOrderHistory } from '~/features/order/allOrdersSaga';
import paymentSaga from '~/features/payment/paymentSaga';

export default function* rootSaga() {
    yield all([watchCheckTokenExpiration(), watchLogoutUser(), paymentSaga(), watchOrderHistory()]);
}
