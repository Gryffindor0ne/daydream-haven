import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '~/app/reduxHooks';
import { authState } from '~/features/auth/authSlice';

const LoginRouteGuard = () => {
    const { isAuthenticated } = useAppSelector(authState);

    const location = useLocation();
    console.log(location);
    const queryPath = location?.search?.replace('?redirectedFrom=', '/');
    const from = queryPath || location?.state?.redirectedFrom?.pathname || '/';
    console.log(from);

    return isAuthenticated ? <Navigate to={from} replace /> : <Outlet />;
};

export default LoginRouteGuard;
