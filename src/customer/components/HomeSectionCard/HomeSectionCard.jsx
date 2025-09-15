import React from 'react';

const HomeSectionCard = ({product}) => {
  return (
    <div
      className="
        h-full
        w-[16rem] mx-2
        bg-white rounded-xl
        shadow-md
        transition
        duration-300
        ease-out
        will-change-transform
        hover:-translate-y-1 hover:shadow-lg
    
      "
    >
      {/* Image Section */}
      <div className="w-full h-48 bg-gray-100 overflow-hidden rounded-t-xl">
        <img
          className="w-full h-full object-cover object-top transform transition duration-300 group-hover:scale-[1.03]"
          src={product.imageUrl}
          alt="Kurta"
          loading="lazy"
        /> 
        
      </div>
      

      {/* Content Section */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900">{product.brand}</h3>
        <p className="mt-2 text-sm text-gray-600">
         {product.title}
        </p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
 