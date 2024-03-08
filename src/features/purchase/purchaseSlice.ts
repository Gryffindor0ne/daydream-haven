import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/app/store';
import { OrderProductSummaryInfo } from '~/components/ProductSelectBox';

interface PurchaseState {
    selectedProducts: OrderProductSummaryInfo[];
}

const initialState: PurchaseState = {
    selectedProducts: [],
};

const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        addToPurchase: (state, action: PayloadAction<OrderProductSummaryInfo[]>) => {
            state.selectedProducts = action.payload;
        },
    },
});

export const { addToPurchase } = purchaseSlice.actions;

export const selectPurchase = (state: RootState): PurchaseState => state.purchase;

const purchaseReducer = purchaseSlice.reducer;

export default purchaseReducer;
