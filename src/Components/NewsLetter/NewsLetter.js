import React from 'react';
import './NewsLetter.css';
import { useTranslation } from 'react-i18next';

const NewsLetter = () => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="discount-banner w-full h-[307px] bg-cover flex justify-center items-center ">
                <div>
                    <div data-aos="fade-up" className="aos-init aos-animate">
                        <h1 className="sm:text-3xl text-xl font-semibold text-qblack mb-2 text-center"> Get <span className="mx-1 text-yellow-400">Best Talents </span> at one place </h1>
                        <p className="text-center sm:text-[18px] text-sm font-semibold"> Find Talents or Post a job </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;