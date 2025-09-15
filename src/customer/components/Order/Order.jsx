import { Grid } from "@mui/material";
import React from "react";
import OrderCard from "./OrderCard";

const orderStatus = [
  { label: "On The Way !", value: "onTheWay" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  return (
    <div className="p-5">
      <Grid container spacing={3}>
        {/* Sidebar filter */}
        <Grid item xs={3}>
          <div className="h-auto w-80 bg-gray-200 p-6 rounded-xl shadow-xl sticky top-5">
            <h1 className="font-bold text-lg border-b pb-2">Filter</h1>

            <div className="space-y-4 mt-6">
              <h1 className="font-bold text-gray-700">ORDER STATUS</h1>

              {orderStatus.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 transition shadow-sm font-semibold"
                >
                  <input
                    id={option.value}
                    value={option.value}
                    type="checkbox"
                    className="h-4 w-4 border-gray-400 text-red-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label
                    htmlFor={option.value}
                    className="ml-3 text-sm text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        {/* Main content area (Order cards) */}
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <div className="space-y-7">
            {[1,1,1,1,].map((item)=><OrderCard />)}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
