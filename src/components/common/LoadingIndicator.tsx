import { Backdrop, CircularProgress } from '@mui/material';

import { useAppSelector } from '~/app/reduxHooks';
import { authState } from '~/features/auth/authSlice';
import { paymentState } from '~/features/payment/paymentSlice';

const LoadingIndicator = () => {
    const { isLoading } = useAppSelector(authState);
    const { loading } = useAppSelector(paymentState);

    // 전체 로딩 상태
    const isOverallLoading = isLoading || loading;

    return (
        <Backdrop open={isOverallLoading} sx={{ background: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="primary" />
        </Backdrop>
    );
};

export default LoadingIndicator;
