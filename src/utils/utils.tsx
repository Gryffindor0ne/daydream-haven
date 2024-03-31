import { ProductInfo } from '~/components/ProductsList';

export const formattedNumber = (price: number) => new Intl.NumberFormat().format(price);

export const findPriceByCapacityAndPeriod = (
    item: ProductInfo,
    capacity: string,
    periodIndex: number,
): number | undefined => {
    const priceItem = item?.plans?.find((priceItem) => priceItem?.name === capacity);
    return priceItem ? priceItem?.prices[periodIndex - 1] : undefined;
};
