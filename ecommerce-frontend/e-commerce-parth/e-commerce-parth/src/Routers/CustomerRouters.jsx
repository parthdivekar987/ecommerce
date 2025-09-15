import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../State/Auth/Action';
import { CircularProgress, Box } from '@mui/material';

// Import all your page components
import HomePage from '../customer/pages/HomePage/HomePage';
import Cart from '../customer/components/Cart/Cart';
import Navigation from '../customer/components/Navigation/Navigation';
import Footer from '../customer/components/Footer/Footer';
import Product from '../customer/components/Product/Product';
import ProductDetails from '../customer/components/ProductDetails/ProductDetails';
import Checkout from '../customer/components/Checkout/Checkout';
import Order from '../customer/components/Order/Order';
import OrderDetails from '../customer/components/Order/OrderDetails';
import PaymentSuccess from '../customer/components/Payment/PaymentSuccess';

const CustomerRouters = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    // Get the auth state from the Redux store
    const { auth } = useSelector(store => store);

    useEffect(() => {
        // If a JWT exists, dispatch the action to fetch the user's profile
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, dispatch]);

    // THIS IS THE CRITICAL FIX:
    // If the app is in the process of loading the user's profile,
    // display a full-screen loading spinner.
    // This prevents any interaction until authentication is confirmed.
    if (auth.loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Once loading is complete, render the main application
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <Routes>
                <Route path='/login' element={<HomePage />} />
                <Route path='/register' element={<HomePage />} />
                <Route path='/' element={<HomePage />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/:lavelOne/:lavelTwo/:lavelThree' element={<Product />} />
                <Route path='/product/:productId' element={<ProductDetails />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/account/order' element={<Order />} />
                <Route path='/account/order/:orderId' element={<OrderDetails />} />
                <Route path='/payment/:orderId' element={<PaymentSuccess />} />
            </Routes>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default CustomerRouters;

