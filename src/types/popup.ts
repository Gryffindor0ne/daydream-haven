import { OrderItemSummaryInfo } from '~/types/order';

export interface PopupProps {
    open: boolean;
    message: string;
    onClose: () => void;
    cartPopupClose?: (open: boolean) => void;
}

export interface cartPopupProps {
    open: boolean;
    onClose: (open: boolean) => void;
}

export interface duplicatePopupProps {
    open: boolean;
    products: OrderItemSummaryInfo[];
    onClose: () => void;
    showCartGuidancePopup: (open: boolean) => void;
}
