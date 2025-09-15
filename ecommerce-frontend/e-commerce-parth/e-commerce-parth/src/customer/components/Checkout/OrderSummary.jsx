    import React, { useEffect } from "react";
    import AddressCard from "../AddressCard/AddressCard";
    import CartItem from "../Cart/CartItem";
    import { Button } from "@mui/material";
    import { useDispatch, useSelector } from "react-redux";
    import { useLocation } from "react-router-dom";
    import { getOrderById } from "../../../State/Order/Action";

    // You need to import the createPayment action from your Payment/Action.js file
    import { createPayment } from "../../../State/Payment/Action";

    const OrderSummary = () => {
        const dispatch = useDispatch();
        const location = useLocation();
        const { order } = useSelector((store) => store);
        
        const searchParams = new URLSearchParams(location.search);
        const orderId = searchParams.get("order_id");

        useEffect(() => {
            if (orderId) { 
                dispatch(getOrderById(orderId));
            }
        }, [orderId]);

        const handleCheckout = () => {
            dispatch(createPayment(orderId));
        };

        return (
            <div className='px-10 lg:px-20'>
                {order.order ? (
                    <div>
                        <div className="p-5 shadow-lg rounded-s-md border">
                            <AddressCard address={order.order?.shipingAddress} />
                        </div>

                        <div>
                            <div className="lg:grid grid-cols-3 relative">
                                <div className="col-span-2">
                                    {/* FIX: Add a unique 'key' prop to each item */}
                                    {order.order?.orderItems.map((item, index) => (
                                        <CartItem key={index} item={item} />
                                    ))}
                                </div>
                                
                                <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
                                    <div className="border">
                                        <p className="uppercase font-bold opacity-60 pb-4 px-1">
                                            Price details
                                        </p>
                                        <hr />
                                        <div className="space-y-3 font-semibold px-2">
                                            <div className="flex justify-between pt-3 text-black">
                                                <span>Price</span>
                                                <span>₹{order.order?.totalPrice}</span>
                                            </div>
                                            <div className="flex justify-between pt-3 text-green-600">
                                                <span>Discount</span>
                                                <span>-₹{order.order?.discount}</span>
                                            </div>
                                            <div className="flex justify-between pt-3 text-green-600">
                                                <span>Delivery Charge</span>
                                                <span>Free</span>
                                            </div>
                                            <div className="flex justify-between pt-3 font-bold">
                                                <span>Total Amount</span>
                                                <span className=" text-green-600">
                                                    ₹{order.order?.totalDiscountedPrice}
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="medium"
                                            className="mt-3 w-full py-2.5 px-5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={handleCheckout}
                                        >
                                            Checkout
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <h2 className="text-xl font-semibold">Loading order details...</h2>
                    </div>
                )}
            </div>
        );
    };

    export default OrderSummary;