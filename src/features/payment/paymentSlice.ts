import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '~/app/store';

const initialState = {
    paymentStatus: '',
    loading: false,
    error: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        fetchData(state) {
            state.loading = true;
        },
        paymentSuccess(state) {
            state.loading = false;
            state.paymentStatus = 'success';
        },
        paymentFailure(state, action) {
            state.loading = false;
            state.paymentStatus = 'failure';
            state.error = action.payload;
        },
        resetPaymentState(state) {
            state.paymentStatus = '';
            state.error = null;
        },
    },
});

export const { fetchData, paymentSuccess, paymentFailure, resetPaymentState } = paymentSlice.actions;

export const paymentState = (state: RootState) => state.payment;

const paymentReducer = paymentSlice.reducer;

export default paymentReducer;
