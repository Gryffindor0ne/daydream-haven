import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '~/app/reduxHooks';
import { authState } from '~/features/auth/authSlice';

const PrivatedRoute = () => {
    const { isAuthenticated } = useAppSelector(authState);
    const currentLocation = useLocation();

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={'/login'} replace state={{ redirectedFrom: currentLocation }} />
    );
};
export default PrivatedRoute;
