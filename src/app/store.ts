import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from '~/features/cart/cartSlice';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import orderReducer from '~/features/order/orderSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'order'],
};

const rootReducer = combineReducers({
    cart: cartReducer,
    order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
