import { OrderItemSummaryInfo } from '~/types/order';

export interface CartItemProps {
    item: OrderItemSummaryInfo;
    deliveryFeeCondition: string;
    checked: boolean;
    handler: () => void;
}

export type CartState = {
    cartItems: OrderItemSummaryInfo[];
    subTotal: number;
    deliveryFeeCondition: string;
};
