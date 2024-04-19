import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
// import { createLogger } from 'redux-logger';

import cartReducer from '~/features/cart/cartSlice';
import orderReducer from '~/features/order/orderSlice';
import authReducer from '~/features/auth/authSlice';
import rootSaga from '~/app/rootSaga';
import paymentReducer from '~/features/payment/paymentSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'order', 'auth', 'payment'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    payment: paymentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
// const logger = createLogger();

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
