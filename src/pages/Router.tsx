import { Routes, Route, Navigate } from 'react-router-dom';
import ProductDetail from '~/components/ProductDetail';
import Footer from '~/components/layout/Footer';
import HeaderBar from '~/components/layout/Header';
import Home from '~/pages';
import About from '~/pages/About';
import Contact from '~/pages/Contact';
import Shop from '~/pages/Shop';
import Subscription from '~/pages/Subscription';
import Wholesale from '~/pages/Wholesale';

const Router = () => {
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
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </>
    );
};

export default Router;
