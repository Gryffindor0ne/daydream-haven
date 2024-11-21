import { nanoid } from 'nanoid';
import { ProductInfo } from '~/components/product/ProductsList';
import { OrderDetailProps } from '~/features/payment/paymentSaga';

export const transformOrdersWithProducts = (
    orders: OrderDetailProps[],
    products: ProductInfo[],
): OrderDetailProps[] => {
    const productMap = new Map(products.map((p) => [p.id, p]));

    return orders.map((order) => ({
        ...order,
        items: order.items.map((item) => ({
            ...item,
            name: productMap.get(item.productId)?.name ?? '상품명 없음',
            thumbnail: productMap.get(item.productId)?.thumbnail ?? '',
            id: nanoid(),
        })),
    })) as OrderDetailProps[];
};
