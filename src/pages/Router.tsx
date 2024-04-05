import { Routes, Route, Navigate } from 'react-router-dom';
import ProductDetail from '~/pages/ProductDetail';

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
import PrivatedRoute from '~/pages/PrivatedRoute';
import LoginRouteGuard from '~/pages/LoginRouteGuard';

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<ProductDetail />} />
                <Route path="/wholesale" element={<Wholesale />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/subscription/:id" element={<ProductDetail />} />
                <Route path="/contact" element={<Contact />} />

                <Route element={<LoginRouteGuard />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route path="/cart" element={<ShoppingCart />} />

                <Route element={<PrivatedRoute />}>
                    <Route path="/order" element={<OrderPayment />} />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};
export default Router;
