import React, { useEffect, useState } from 'react';

const Recomended = () => {
    
    const [services,setServices] = useState([])
    useEffect(()=>{
        fetch("http://localhost:5000/services")
        .then(res=>res.json())
        .then(data=>setServices(data.services))
    },[])
    return (
        <div>
           
            <section className="bg-white text-gray-800">
                <div className="container p-6 mx-auto space-y-6">
                    <div className="space-y-2 text-start">
                        <h2 className="text-3xl font-bold">Recomended</h2>

                    </div>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 ">
                   
                    {
                    services?.map(service =>
                        <div key={service._id} className='border text-start px-12 py-4 gap-y-4 shadow-md rounded-md h-[250px] flex  flex-col  bg-slate-800 text-white relative ' >
                            <div>
                                <p className='uppercase'>{service.TITLE}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Time Require: {service.DURATION}</p>
                                    <p>Budget: {service.BUDGET} $</p>
                            </div>
                            <div className='flex gap-y-3 flex-col'>
                                <p>{service.DESCRIPTION}</p>
                                <p>Skills: {service.SKILLS}</p>
                            </div>
                            <button className='bg-blue-500 text-white font-semibold py-1 px-3 absolute w-full left-0 bottom-0'>Details</button>
                        </div>

                    )
                }
                
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Recomended;