import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from '~/features/cart/cartSlice';
import purchaseReducer from '~/features/purchase/purchaseSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'purchase'],
};

const rootReducer = combineReducers({
    cart: cartReducer,
    purchase: purchaseReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
