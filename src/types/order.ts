// 공통 타입 추출
interface BaseOrderItem {
    id: string;
    quantity: number;
    grindSize: string;
    capacity: string;
    period?: string;
}

interface BaseAddress {
    postcode: string;
    address: string;
}
// 주요 타입 정의
export interface OrderProps {
    postcode: string;
    address: string;
    additionalAddress: string;
    selectedPaymentMethod: string;
    orderer: string;
    cashReceipt: boolean;
    issuanceTarget: string;
    issuanceTargetNumber: string;
    paymentAgreed: boolean;
}

export interface OrderItemProps extends BaseOrderItem {}

export interface OrderItemSummaryInfo extends BaseOrderItem {
    productId: string;
    name: string;
    price: number;
    thumbnail: string;
    type?: string;
}

export interface OrderHistoryProps extends OrderItemSummaryInfo {}

export interface PaymentProps {
    paymentId: string;
    type: string;
}

export interface PaymentInfo {
    paymentMethod: string;
    cashReceiptRequired: boolean;
    issuanceNumber: string;
    cashReceiptRecipientName: string | null;
    accountHolderName: string | null;
}

interface DeliveryInfo extends BaseAddress {
    name: string;
    addressDetail: string;
}

export interface OrderDetailProps {
    id: string;
    status: string;
    items: OrderItemSummaryInfo[];
    paymentInfo: PaymentInfo;
    deliveryInfo: DeliveryInfo;
    createdAt: string;
    updatedAt: string;
}

export type PaymentApiResponse = import('axios').AxiosResponse<OrderDetailProps>;

export interface AddressProps extends BaseAddress {}

export interface OrderState {
    orderItems: OrderItemSummaryInfo[];
    subTotal: number;
    deliveryFee: number;
    totalAmount: number;
    directOrder: boolean;
}
