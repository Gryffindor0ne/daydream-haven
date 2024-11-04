import { memo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '~/app/reduxHooks';
import { authState } from '~/features/auth/authSlice';

const AuthenticatedRoute = memo(() => {
    const { isAuthenticated } = useAppSelector(authState);
    const currentLocation = useLocation();

    if (isAuthenticated) return <Outlet />;

    return <Navigate to="/login" replace state={{ redirectedFrom: currentLocation }} />;
});

AuthenticatedRoute.displayName = 'AuthenticatedRoute';
export default AuthenticatedRoute;
