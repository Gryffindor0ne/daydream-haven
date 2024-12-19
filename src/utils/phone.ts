/**
 * 전화번호를 하이픈이 포함된 형식으로 변환합니다.
 * @param phoneNumber - 11자리 전화번호 문자열
 * @returns XXX-XXXX-XXXX 형식의 문자열
 */

export const formatPhoneNumber = (phoneNumber: string): string => {
    return phoneNumber.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
};
