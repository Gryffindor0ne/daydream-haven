import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from '~/features/cart/cartSlice';
import purchaseReducer from '~/features/purchase/purchaseSlice';

const rootReducer = combineReducers({
    cart: cartReducer,
    purchase: purchaseReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
