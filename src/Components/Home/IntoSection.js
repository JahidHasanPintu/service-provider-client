import React from 'react';

const IntoSection = () => {
    return (
        <div className="text-start hero min-h-screen bg-white">
            <div className="hero-content flex-col lg:flex-row">
               
                <div>
                    <h1 className="text-5xl font-bold">Trusted by leading
                        brands and startups</h1>
                    <p className="py-6">Forget the old rules. You can have the best people.
                        Right now. Right here..</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
                <img src="https://work.life/wp-content/uploads/2018/04/3-important-lessons.png" className="max-w-sm rounded-lg " />
            </div>
        </div>
    );
};

export default IntoSection;