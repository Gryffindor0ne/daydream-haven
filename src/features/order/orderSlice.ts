import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '~/app/store';
import { OrderItemSummaryInfo, OrderState } from '~/types/order';

const initialState: OrderState = {
    orderItems: [],
    subTotal: 0,
    deliveryFee: 0,
    totalAmount: 0,
    directOrder: false,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addToOrder: (state, action: PayloadAction<OrderItemSummaryInfo[]>) => {
            state.orderItems = action.payload;
        },
        updateOrderTotal(state) {
            const subTotal = state.orderItems.reduce((total, item) => total + item.price, 0);
            const deliveryFee = calculateDeliveryFee(subTotal);
            const totalAmount = subTotal + deliveryFee;

            state.subTotal = subTotal;
            state.deliveryFee = deliveryFee;
            state.totalAmount = totalAmount;
        },
        removeFromOrder(state, action: PayloadAction<string>) {
            const index = state.orderItems.findIndex((item) => item.id === action.payload);
            if (index !== -1) {
                state.totalAmount -= state.orderItems[index].price;
                state.orderItems.splice(index, 1);
            }
        },
        clearOrder(state) {
            state.orderItems = [];
            state.subTotal = 0;
            state.deliveryFee = 0;
            state.totalAmount = 0;
        },
        updateDirectOrder(state, action: PayloadAction<boolean>) {
            state.directOrder = action.payload;
        },
    },
});

const calculateDeliveryFee = (subTotal: number): number => {
    return subTotal >= 50000 ? 0 : 3000;
};

export const { addToOrder, updateOrderTotal, removeFromOrder, clearOrder, updateDirectOrder } = orderSlice.actions;

export const orderState = (state: RootState): OrderState => state.order;

const orderReducer = orderSlice.reducer;

export default orderReducer;
