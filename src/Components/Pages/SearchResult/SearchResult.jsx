
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaBeer } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../../api/apiURL';
import axios from 'axios';
const SearchResult = (props) => {
    const location = useLocation();
    const search = location?.state?.search;
    const navigate = useNavigate();


    const [services, setServices] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const baseURL = getApiUrl();
    // const [products, total] = useProducts(1, 100, search);

    useEffect(() => {
        // setLoading(true);

        const fetchServices = async () => {
            try {
                const response = await axios.get(`${baseURL}/services`, {
                    params: {
                        page,
                        limit,
                        search,
                    },
                });

                const { success, services } = response.data;

                if (success) {
                    setServices(services);
                } else {
                    console.error("Error fetching data");
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };


        fetchServices();

    }, [search]);

    const navigateToServiceDetails = (service) => {
        navigate(`/job-details/${service._id}`, { state: { service } });

    }

    return (

        <div className="p-5">
            <h2 className='text-start mb-1'>Showing result for: {search} </h2>
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
        </div>

    );
};

export default SearchResult;