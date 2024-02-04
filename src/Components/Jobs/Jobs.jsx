import React, { useEffect, useState } from 'react';
import Job from './Job';
import { getApiUrl } from '../../api/apiURL';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Jobs = () => {
    const location = useLocation();
    const category = location?.state?.category;
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(100);
    const [loading, setLoading] = useState(false);
    
    const baseURL = getApiUrl();

    useEffect(()=>{
        // console.log("Working",category.cat_name )
        if(category){
            setFilterType(category.cat_name)
        }
    },[category])

    useEffect(() => {
        setLoading(true);

        const fetchServices = async () => {
            try {
                const response = await axios.get(`${baseURL}/services`, {
                  params: {
                    page,
                    limit,
                    search,
                    filterType,
                  },
                });
        
                const { success, services } = response.data;
        
                if (success) {
                    setServices(services);
                    setLoading(false);
                } else {
                  console.error("Error fetching data");
                }
              } catch (error) {
                console.error("Error fetching data", error);
              }
            // try {
            //     const url = `${baseURL}/services`;
            //     const response = await fetch(url);
            //     const data = await response.json();
            //     setServices(data.services);
            //     setLoading(false);
            // } catch (error) {
            //     console.error(error);
            // }
        };


        fetchServices();
       
    }, [search,filterType]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
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