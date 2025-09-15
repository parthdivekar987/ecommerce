import React from "react";
import { Grid } from "@mui/material";

const OrderCard = () => {
  const isDelivered = true;

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className=" h-auto w-full bg-white rounded-2xl shadow-lg  hover:shadow-2xl transition p-5 shadow-black">
          {/* Main row */}
          <div className="flex items-start gap-6">
            {/* Image */}
            <img
              className="w-48 h-32 md:w-56 md:h-36 lg:w-60 lg:h-40 object-cover object-center rounded-md flex-shrink-0"
              src="https://www.fashionbeans.com/wp-content/uploads/2023/02/lucafaloni_manleaningagaintsacar-380x300.jpg"
              alt="product"
            />

            {/* Middle: title + attrs (takes remaining space) */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold truncate pr-2">
                  Men's Slim Formal Shirt
                </h3>

                {/* Right: price + status (desktop) */}
                <div className="hidden md:flex items-center gap-6 flex-shrink-0 min-w-[320px] justify-end">
                  <p className="text-base font-semibold whitespace-nowrap">₹245</p>

                  {isDelivered ? (
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-700 whitespace-nowrap inline-flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500 inline-block" />
                        Delivered ON August 30
                      </p>
                      <span className="text-xs text-gray-500">
                        Your item has been delivered
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-700 whitespace-nowrap inline-flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 inline-block" />
                        Expected Delivery ON August 30
                      </p>
                      <span className="text-xs text-gray-500">
                        Your item is yet to be delivered
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Attributes under the title */}
              <div className="mt-2 space-y-1">
                <p className="opacity-70 text-sm font-medium">Size: M</p>
                <p className="opacity-70 text-sm font-medium">Color: Black</p>
              </div>
            </div>

            {/* Right column for small screens (stacks below title on small viewports) */}
            <div className="md:hidden flex flex-col items-start gap-2 flex-shrink-0">
              <p className="text-base font-semibold">₹245</p>

              {isDelivered ? (
                <div className="flex flex-col">
                  <p className="text-sm text-gray-700 inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500 inline-block" />
                    Delivered ON August 30
                  </p>
                  <span className="text-xs text-gray-500">
                    Your item has been delivered
                  </span>
                </div>
              ) : (
                <div className="flex flex-col">
                  <p className="text-sm text-gray-700 inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 inline-block" />
                    Expected Delivery ON August 30
                  </p>
                  <span className="text-xs text-gray-500">
                    Your item is yet to be delivered
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default OrderCard;
