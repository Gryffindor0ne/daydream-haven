import { CircularProgress } from '@mui/material';

import { useAppSelector } from '~/app/reduxHooks';
import { authState } from '~/features/auth/authSlice';
import { paymentState } from '~/features/payment/paymentSlice';

const LoadingIndicator = () => {
    const { isLoading } = useAppSelector(authState);
    const { loading } = useAppSelector(paymentState);

    return isLoading || loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </div>
    ) : null;
};

export default LoadingIndicator;
