import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Recomended = () => {

    const [services, setServices] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/services")
            .then(res => res.json())
            .then(data => setServices(data.services))
    }, []);

    const navigate = useNavigate();
    const navigateToServiceDetails = (service) => {
        navigate(`/job-details/${service._id}`, { state: { service } });

    }
    return (
        <div>

            <section className="bg-white text-gray-800">
                <div className="container p-6 mx-auto space-y-6">
                    <div className="space-y-2 text-start">
                        <h2 className="text-3xl font-bold">Recomended</h2>

                    </div>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 ">

                        {
                            services?.slice(0, 6).map(service =>
                                <div key={service._id} className='border text-start px-12 py-4 gap-y-4 shadow-md rounded-md h-[250px] flex  flex-col  bg-gray-200 text-black relative ' >
                                    <div>
                                        <p className='uppercase'>{service.TITLE}</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='text-blue-500'>Time Require: {service.DURATION}</p>
                                        <p className='text-red-500'>Budget: {service.BUDGET} ৳</p>
                                    </div>
                                    <div className='flex gap-y-3 flex-col'>
                                        <p>{service.DESCRIPTION}</p>
                                        <p>Skills: {service.SKILLS}</p>
                                    </div>
                                    <button onClick={() => navigateToServiceDetails(service)} className='bg-blue-500 text-white font-semibold py-1 px-3 absolute w-full left-0 bottom-0'>Details</button>
                                </div>

                            )
                        }

                    </div>
                   <div>
                   <Link  className="font-lg font-medium" to={"/jobs"}>Show more</Link>
                   </div>
                </div>
            </section>
        </div>
    );
};

export default Recomended;