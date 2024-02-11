import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Product = (props) => {
  const product = props.product;
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate(`/checkout`, { state: { product } });
}

  return (
    <div className="mx-auto mt-11 w-[300px] transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <img className="h-48 w-full object-cover object-center" src={product?.imageLinks} alt="Product Image" />
      <div className="p-4">
        <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{product?.productName}</h2>
        <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{product?.description}</p>
        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">৳{product?.price} </p>
          <button onClick={handleCheckout} className="bg-blue-500 mx-auto hover:bg-blue-600 text-white py-1 px-2  rounded">
          Buy Now
                </button>
          {/* <p className="ml-auto text-base font-medium text-green-500"></p> */}
          <p className="ml-auto text-base font-medium text-green-500">{product?.brand}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;