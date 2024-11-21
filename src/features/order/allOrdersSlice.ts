import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/app/store';
import { OrderDetailProps } from '~/features/payment/paymentSaga';

interface AllOrdersState {
    allOrders: OrderDetailProps[];
    loading: boolean;
    error: string | null;
}

const initialState: AllOrdersState = {
    allOrders: [],
    loading: false,
    error: null,
};

const allOrdersSlice = createSlice({
    name: 'allOrders',
    initialState,
    reducers: {
        fetchAllOrdersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchAllOrdersSuccess(state, action: PayloadAction<OrderDetailProps[]>) {
            state.allOrders = action.payload;
            state.loading = false;
        },
        fetchAllOrdersFailure(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
            state.loading = false;
        },

        clearAllOrders(state) {
            state.allOrders = [];
        },
    },
});

export const { fetchAllOrdersRequest, fetchAllOrdersSuccess, fetchAllOrdersFailure, clearAllOrders } =
    allOrdersSlice.actions;
export const allOrdersState = (state: RootState): AllOrdersState => state.allOrders;
const allOrdersReducer = allOrdersSlice.reducer;
export default allOrdersReducer;
