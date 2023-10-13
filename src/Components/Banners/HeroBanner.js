import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
    const navigate = useNavigate();
    const navigateToCategories = (catID) => {
        navigate(`/offer`);


    }
    return (
        <div className='w-11/12 mx-auto mt-5 mb-5'>
            <div className="banner-card xl:flex xl:space-x-[30px] xl:h-[600px]  mb-[30px]">
                <div  className="xl:w-[740px] w-full h-full">
                    
                        <picture>
                            <source media="(min-width:1025px)" srcset=""/><img src="" alt="" className="w-full max-w-full cursor-pointer h-auto object-cover"/></picture>
                            
                        </div>
                        <div className="flex-1 flex xl:flex-col flex-row xl:space-y-[30px] h-full">
                            <div onClick={() => navigateToCategories(1)} className="w-full xl:h-1/2 cursor-pointer"><img src="" alt="" className="w-full h-full"/></div>
                            <div className="w-full xl:h-1/2 cursor-pointer"><img src="" alt="" className="w-full h-full"/></div>
                        </div>
                </div>
            </div>
            );
};

            export default HeroBanner;