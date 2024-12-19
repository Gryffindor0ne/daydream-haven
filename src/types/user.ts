export interface LoginInfo {
    email: string;
    password: string;
}

export interface RegisterInfo {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    phoneNumber: string;
    termsAgreed: boolean[];
    marketingTermsAgreed: boolean;
}

export interface UserInfoProps {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    address: string | null;
    totalPurchaseAmount: number;
    totalPurchaseCount: number;
}

export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
}
