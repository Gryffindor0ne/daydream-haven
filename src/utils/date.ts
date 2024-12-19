/**
 * ISO 날짜 문자열을 한국어 날짜 형식으로 변환합니다.
 * @param isoDateString - ISO 형식의 날짜 문자열
 * @returns YYYY년 MM월 DD일 HH:MM 형식의 문자열
 */

export const formatDateToKorean = (isoDateString: string): string => {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};

/**
 * ISO 날짜 문자열을 점으로 구분된 날짜 형식으로 변환합니다.
 * @param isoDateString - ISO 형식의 날짜 문자열
 * @returns YYYY. MM. DD 형식의 문자열
 */

export const formatDateToDots = (isoDateString: string): string => {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}. ${month}. ${day}`;
};
