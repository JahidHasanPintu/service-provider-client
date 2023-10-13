import React from 'react';
import { Link } from 'react-router-dom';

const Breadcumbs = (props) => {
    return (
        <div className="w-full mb-[30px]">
            <div className="page-title-wrapper bg-[#FFFAEF] w-full h-[100px] py-10">
                <div className="container-x w-11/12 mx-auto">
                    <div className="mb-5">
                        <div className="text-start breadcrumb-wrapper font-400 text-[13px] text-blue-500 "><span><Link to={"/"}><span className="mx-1 capitalize">home</span></Link><span className="sperator">/</span></span><span><Link to={props.path}><span className="mx-1 capitalize">{props.name}</span></Link><span className="sperator">/</span></span>
                        </div>
                        <div className="flex justify-center">
                            <h1 className="text-3xl font-semibold text-qblack">{props.name}</h1>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Breadcumbs;