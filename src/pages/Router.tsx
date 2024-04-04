import { Routes, Route, Navigate } from 'react-router-dom';
import ProductDetail from '~/pages/ProductDetail';
import Footer from '~/components/layout/Footer';
import HeaderBar from '~/components/layout/Header';
import Home from '~/pages';
import About from '~/pages/About';
import Contact from '~/pages/Contact';
import Shop from '~/pages/Shop';
import Subscription from '~/pages/Subscription';
import Wholesale from '~/pages/Wholesale';
import ShoppingCart from '~/pages/ShoppingCart';
import OrderPayment from '~/pages/OrderPayment';
import Login from '~/pages/auth/Login';
import Register from '~/pages/auth/Register';
import { useAppSelector } from '~/app/reduxHooks';
import { authState } from '~/features/auth/authSlice';

const Router = () => {
    const { isAuthenticated } = useAppSelector(authState);

    return (
        <>
            <HeaderBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<ProductDetail />} />
                <Route path="/wholesale" element={<Wholesale />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/subscription/:id" element={<ProductDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/order" element={<OrderPayment />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </>
    );
};
export default Router;
