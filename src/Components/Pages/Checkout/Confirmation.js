import React, { useEffect } from 'react';
import delBanner from '../../../assets/images/banneran2.gif';
import { useLocation } from 'react-router-dom';


const Confirmation = () => {
    const { state } = useLocation();
  const invoiceId = state?.responseData?._id;
 

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
        window.location.href = '/';
    }, 7000); // Redirect after 10 seconds (10000 milliseconds)

    return () => {
      clearTimeout(redirectTimer);
    };
  }, []);

    
    return (
        <div className="w-11/12 mx-auto flex flex-col items-center justify-center" style={{ backgroundColor: '#e6f0f4' }}>
            <h3 className="font-bold text-xl mt-10">Thanks for your order !</h3>
            <h4 className="">Invoice ID: {invoiceId}</h4>
            <h4 className="">Payment Status: Unpaid </h4>
            <p className="py-4">We are processing your order. It can take up to 3 days. </p>
            <img src={delBanner} alt="" className="text-center" />
        </div>

    );
};

export default Confirmation;