import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/app/store';
import { OrderProductSummaryInfo } from '~/components/ProductSelectBox';

export type CartState = {
    cartItems: OrderProductSummaryInfo[];
};

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<OrderProductSummaryInfo[]>) => {
            action.payload.forEach((newProduct) => {
                const existingProductIndex = state.cartItems.findIndex(
                    (product) =>
                        product.name === newProduct.name &&
                        product.weight === newProduct.weight &&
                        product.grindSize === newProduct.grindSize,
                );
                if (existingProductIndex !== -1) {
                    state.cartItems[existingProductIndex].quantity += newProduct.quantity;
                    state.cartItems[existingProductIndex].price += newProduct.price;
                } else {
                    state.cartItems.push(newProduct);
                }
            });
        },
        removeFromCart: (state, action: PayloadAction<OrderProductSummaryInfo[]>) => {
            state.cartItems = action.payload;
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartState = (state: RootState): CartState => state.cart;

export const cartReducer = cartSlice.reducer;

export default cartReducer;
