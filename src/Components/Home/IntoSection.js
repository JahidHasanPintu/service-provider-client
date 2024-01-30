import React from 'react';
import { Link } from 'react-router-dom';

const IntoSection = () => {
    return (
        <div className="px-10 py-10 text-start hero  bg-gray-100">
            <div className="hero-content flex-col lg:flex-row">
               
                <div>
                    <h1 className="text-5xl font-bold">One-stop solution for service your desire.</h1>
                    <p className="py-6">Forget the old rules. You can have the best people.
                        Right now. Right here..</p>
                    <Link to={"/post-a-job"} > <button className="btn  primary-bg-color">Get Started</button></Link>
                </div>
                <img src="https://work.life/wp-content/uploads/2018/04/3-important-lessons.png" className="max-w-sm rounded-lg " />
            </div>
        </div>
    );
};

export default IntoSection;