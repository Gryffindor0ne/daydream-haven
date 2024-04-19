import { all } from 'redux-saga/effects';
import { watchLoginWithToken, watchLogoutUser } from '~/features/auth/authSaga';
import paymentSaga from '~/features/payment/paymentSaga';

export default function* rootSaga() {
    yield all([watchLoginWithToken(), watchLogoutUser(), paymentSaga()]);
}
