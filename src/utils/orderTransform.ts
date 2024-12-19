import { OrderDetailProps } from '~/types/order';
import { ProductInfo } from '~/types/product';

export const transformOrdersWithProducts = (
    orders: OrderDetailProps[],
    products: ProductInfo[],
    subscriptionInfo: ProductInfo[],
): OrderDetailProps[] => {
    const productMap = new Map(products.map((p) => [p.id, p]));
    const subscrioptionMap = new Map(subscriptionInfo.map((s) => [s.id, s]));

    return orders.map((order) => ({
        ...order,
        items: order.items.map((item) => ({
            ...item,
            name: productMap.get(item.id)?.name ?? subscrioptionMap.get(item.id)?.name,
            thumbnail: productMap.get(item.id)?.thumbnail ?? subscrioptionMap.get(item.id)?.thumbnail,
            id: item.id,
        })),
    })) as OrderDetailProps[];
};
