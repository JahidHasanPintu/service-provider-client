import React, { useEffect, useState } from 'react';
import Job from './Job';
import { getApiUrl } from '../../api/apiURL';
import Loading from '../Loading/Loading';

const Jobs = () => {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const location = "";
    const baseURL = getApiUrl();
    useEffect(() => {
        setLoading(true);

        const fetchServices = async () => {
            try {
                const url = `${baseURL}/services`;
                const response = await fetch(url);
                const data = await response.json();
                setServices(data.services);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };


        fetchServices();
       
    }, [location, searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
        <div>
        {loading ? (
          <Loading/>
        ) : (
            <div className="my-5 flex ">
            <div className="flex flex-wrap -mx-2 justify-center">
                {
                    services?.map(service =>
                        <div key={service._id} className="w-1/3 px-2 py-2">
                            <Job service={service} />
                        </div>

                    )
                }
            </div>


        </div>
        )}
      </div>
        

    );
};

export default Jobs;