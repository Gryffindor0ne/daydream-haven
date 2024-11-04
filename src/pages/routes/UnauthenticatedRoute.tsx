import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '~/app/reduxHooks';
import { authState } from '~/features/auth/authSlice';

const UnauthenticatedRoute = () => {
    const { isAuthenticated } = useAppSelector(authState);

    const location = useLocation();

    const from = location.state?.redirectedFrom || '/mypage';

    return isAuthenticated ? <Navigate to={from} replace /> : <Outlet />;
};

export default UnauthenticatedRoute;
