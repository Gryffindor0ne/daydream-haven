import { Backdrop, CircularProgress } from '@mui/material';

import { useAppSelector } from '~/app/reduxHooks';
import { authState } from '~/features/auth/authSlice';
import { paymentState } from '~/features/payment/paymentSlice';

const LoadingIndicator = () => {
    const { isLoading } = useAppSelector(authState);
    const { loading } = useAppSelector(paymentState);

    return isLoading || loading ? (
        <Backdrop sx={{ background: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading || loading}>
            <CircularProgress color="primary" />
        </Backdrop>
    ) : null;
};

export default LoadingIndicator;
