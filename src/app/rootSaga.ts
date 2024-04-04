import { all } from 'redux-saga/effects';
import { watchLoginWithToken, watchLogoutUser } from '~/features/auth/authSaga';

export default function* rootSaga() {
    yield all([watchLoginWithToken(), watchLogoutUser()]);
}
