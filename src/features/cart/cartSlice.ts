import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/app/store';
import { OrderProductSummaryInfo } from '~/components/ProductSelectBox';

export type CartState = {
    cartItems: OrderProductSummaryInfo[];
    subTotal: number;
    deliveryFeeCondition: string;
};

const initialState: CartState = {
    cartItems: [],
    subTotal: 0,
    deliveryFeeCondition: '',
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
        updateCartTotal: (state) => {
            const subTotal = state.cartItems.reduce((total, item) => total + item.price, 0);
            const deliveryFeeCondition = checkDeliveryFee(subTotal);

            state.subTotal = subTotal;
            state.deliveryFeeCondition = deliveryFeeCondition;
        },
        removeFromCart: (state, action: PayloadAction<OrderProductSummaryInfo[]>) => {
            state.cartItems = action.payload;
        },
    },
});

const checkDeliveryFee = (subTotal: number): string => {
    return subTotal > 50000 ? '배송비 없음' : '3,000원 조건';
};
export const { addToCart, removeFromCart, updateCartTotal } = cartSlice.actions;

export const cartState = (state: RootState): CartState => state.cart;

export const cartReducer = cartSlice.reducer;

export default cartReducer;
