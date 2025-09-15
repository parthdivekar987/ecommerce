import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../../State/Order/Action';
import { updatePayment } from '../../../State/Payment/Action';
import { Alert, AlertTitle, Box, CircularProgress } from '@mui/material';
import OrderTracker from '../Order/OrderTracking';
import AddressCard from '../AddressCard/AddressCard';

const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState(null);
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const { order, loading, error } = useSelector(store => store.order);

    // Effect to read payment details from the URL.
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const razorpayPaymentId = urlParams.get("razorpay_payment_id");
        if (razorpayPaymentId) {
            setPaymentId(razorpayPaymentId);
        }
    }, []);

    // Effect to fetch order details as soon as we have an orderId.
    useEffect(() => {
        if (orderId) {
            dispatch(getOrderById(orderId));
        }
    }, [orderId, dispatch]);

    // Effect to update the payment status once we have both orderId and paymentId.
    useEffect(() => {
        if (orderId && paymentId) {
            const data = { orderId, paymentId };
            dispatch(updatePayment(data));
        }
    }, [orderId, paymentId, dispatch]);

    return (
        <div className='px-4 lg:px-36'>
            <div className='flex flex-col justify-center items-center my-10'>
                <Alert variant='filled' severity='success' sx={{ mb: 6, width: "fit-content" }}>
                    <AlertTitle>Payment Successful</AlertTitle>
                    Congratulations! Your order has been placed.
                </Alert>
            </div>

            <OrderTracker activeStep={1} />

            <div className='space-y-5 py-5 pt-20'>
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                )}

                {!loading && error && (
                    <Alert severity="error">Failed to load order details. Please try again later.</Alert>
                )}
                
                {!loading && order?.orderItems?.map((item) => (
                    <div
                        key={item.id}
                        // --- HOVER EFFECT ADDED HERE ---
                        className="shadow-xl rounded-md p-5 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1"
                    >
                        {/* Left Side: Product Details */}
                        <div className="flex items-center space-x-5 mb-4 sm:mb-0">
                            <img
                                className="w-24 h-24 object-cover object-top rounded-md"
                                src={item.product.imageUrl}
                                alt={item.product.title}
                            />
                            <div className="space-y-1">
                                <p className="font-semibold">{item.product.title}</p>
                                <p className="text-sm text-gray-500">
                                    Size: {item.size}, Color: {item.color}
                                </p>
                                <p className="text-sm text-gray-500">Seller: {item.product.brand}</p>
                                
                                <div className="flex items-center space-x-2">
                                    <p className="font-semibold text-lg">₹{item.discountedPrice}</p>
                                    <p className="opacity-50 line-through">₹{item.price}</p>
                                    <p className="text-green-600 font-semibold">{item.product.discountPercent}% Off</p>
                                </div>

                            </div>
                        </div>

                        {/* Right Side: Shipping Address */}
                        <div className="w-full sm:w-auto">
                           {order?.shippingAddress && <AddressCard address={order.shippingAddress} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PaymentSuccess;

