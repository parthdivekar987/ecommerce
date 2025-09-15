import { Button, IconButton } from '@mui/material';
import React from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch } from 'react-redux';
import { getCart, removeItemToCart, updateItemToCart } from '../../../State/Cart/Action';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    if (!item || !item.product) {
        return null;
    }

    const handleRemoveCartItem = () => {
        dispatch(removeItemToCart(item.id));
    };

    const handleUpdateCartItem = (num) => {
        const newQuantity = item.quantity + num;
        if (newQuantity < 1) {
            handleRemoveCartItem();
        } else {
            const data = { cartItemId: item.id, data: { quantity: newQuantity } };
            dispatch(updateItemToCart(data));
        }
    };

    return (
        <div className='p-5 shadow-lg border rounded-md mb-10'>
            <div className='flex items-center'>
                <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'>
                    <img
                        className="w-full h-full object-cover object-top"
                        src={item.product.imageUrl}
                        alt={item.product.title}
                    />
                </div>
                <div className='ml-5 space-y-1'>
                    <p className='font-semibold'>{item.product.title}</p>
                    <p className='opacity-70'>Size: {item.size}</p>
                    <p className='opacity-70'>Seller: {item.product.brand}</p>

                    <div className="mt-4 flex items-center space-x-4 pt-3">
                        <p className="text-2xl font-bold text-gray-900 hover:text-red-900 pt-1">₹{item.product.discountedPrice}</p>
                        <p className="text-lg text-gray-500 line-through">₹{item.product.price}</p>
                        <p className="text-lg font-semibold text-green-700">{item.product.discountPersent}% Off</p>
                    </div>
                </div>
            </div>

            <div className="lg:flex items-center lg:space-x-10 pt-4">
                <div className='flex items-center space-x-2'>
                    <IconButton onClick={() => handleUpdateCartItem(-1)} disabled={item.quantity <= 1}>
                        <RemoveCircleIcon color='error' />
                    </IconButton>
                    <span className='py-1 px-7 rounded-sm'>{item.quantity}</span>
                    <IconButton onClick={() => handleUpdateCartItem(1)}>
                        <AddCircleIcon color="success" />
                    </IconButton>
                </div>
                <Button onClick={handleRemoveCartItem}>Remove</Button>
            </div>
        </div>
    );
};

export default CartItem;