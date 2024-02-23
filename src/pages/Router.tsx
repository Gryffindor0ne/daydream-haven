import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '~/pages';
import Category from '~/pages/Category';
import Product from '~/pages/Product';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/*" element={<Category />} />
            <Route path="/product/*" element={<Product />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default Router;
