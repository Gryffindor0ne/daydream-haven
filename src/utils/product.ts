import { ProductInfo } from '~/types/product';

/**
 * 제품의 용량과 기간에 따른 가격을 찾습니다.
 * @param item - 제품 정보
 * @param capacity - 용량 이름
 * @param periodIndex - 기간 인덱스
 * @returns 해당하는 가격 또는 undefined
 */

export const findPriceByCapacityAndPeriod = (
    item: ProductInfo,
    capacity: string,
    periodIndex: number,
): number | undefined => {
    const plan = item?.plans?.find((plan) => plan?.name === capacity);
    return plan ? plan?.prices[periodIndex - 1] : undefined;
};
