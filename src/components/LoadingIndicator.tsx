import { CircularProgress } from '@mui/material';
import { useAppSelector } from '~/app/reduxHooks';
import { authState } from '~/features/auth/authSlice';

const LoadingIndicator = () => {
    const { isLoading } = useAppSelector(authState);
    return isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </div>
    ) : null;
};

export default LoadingIndicator;
