import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '~/app/reduxHooks';
import { authState } from '~/features/auth/authSlice';
import { orderState } from '~/features/order/orderSlice';

const PrivatedRoute = () => {
    const { isAuthenticated } = useAppSelector(authState);

    const { orderItems } = useAppSelector(orderState);
    const currentLocation = useLocation();

    return isAuthenticated ? (
        <Outlet />
    ) : orderItems.length !== 0 ? (
        <Navigate to={'/login'} replace state={{ redirectedFrom: currentLocation }} />
    ) : (
        <Navigate to={`/`} />
    );
};
export default PrivatedRoute;
