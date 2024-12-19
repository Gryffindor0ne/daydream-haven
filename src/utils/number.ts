/**
 * 숫자를 현지화된 문자열로 변환합니다.
 * @param price - 변환할 숫자
 * @returns 천 단위로 쉼표가 포함된 문자열
 */

export const formatNumber = (price: number): string => {
    return new Intl.NumberFormat().format(price);
};
