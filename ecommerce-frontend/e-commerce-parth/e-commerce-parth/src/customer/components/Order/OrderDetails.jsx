import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracking from './OrderTracking'
import { Box, Grid } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import { StarIcon } from '@heroicons/react/24/outline'

const OrderDetails = () => {
  return (
    <div className="px-5 lg:px-20 mb-10">
      {/* Delivery Address */}
      <div className="pl-6 py-4 shadow-lg shadow-blue-500/50 rounded-lg mb-8">
        <h1 className="font-semibold text-lg mb-3">Delivery Address</h1>
        <AddressCard />
      </div>

      {/* Order Tracking */}
      <div className="py-10">
        <OrderTracking activeStep={3} />
      </div>

      {/* Product Details Cards */}
      <div className="space-y-6">
        {[1, 1, 1, 1, 1].map((item, index) => (
          <Grid
            key={index}
            container
            className="shadow-xl rounded-md p-6 border bg-white"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            {/* Left side - Product info */}
            <Grid item xs={12} md={7} className="flex items-start gap-5">
              <img
                className="w-[7rem] h-[8rem] object-cover object-top rounded-md"
                src="https://www.fashionbeans.com/wp-content/uploads/2023/02/lucafaloni_manleaningagaintsacar-380x300.jpg"
                alt="product"
              />
              <div className="space-y-2">
                <p className="font-semibold text-lg">
                  Men Slim Mid Rise White Shirt
                </p>
                <p className="text-sm opacity-70 space-x-5">
                  <span>Color: White</span>
                  <span>Size: M</span>
                </p>
                <p className="text-sm opacity-70">Seller: Liharia Fashionista</p>
                <p className="text-green-700 font-bold text-lg">₹245</p>
              </div>
            </Grid>

            {/* Right side - Rate & Review */}
            <Grid
              item
              xs={12}
              md={4}
              className="flex justify-end mt-5 md:mt-0"
            >
              <Box
                sx={{ color: deepPurple[700] }}
                className="flex items-center gap-3 cursor-pointer hover:text-purple-900 transition"
              >
                <StarIcon className="w-6 h-6" />
                <span className="font-semibold">Rate & Review Product</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </div>
    </div>
  )
}

export default OrderDetails
