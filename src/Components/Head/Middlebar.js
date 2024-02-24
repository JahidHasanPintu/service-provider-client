import React, { useEffect, useRef, useState } from 'react';
import siteLogo from '../../assets/logos/service logo.png';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useProducts } from '../../hooks/useProducts';
import { Link, useNavigate } from 'react-router-dom';
import postIcon from '../../assets/icons/post icon.png';
import axios from 'axios';
import { getApiUrl } from '../../api/apiURL';
const Middlebar = () => {
    const [subtotal, setSubtotal] = useState(0);
    const getData = useSelector((state) => state.cartReducer);
    const getCompare = useSelector((state) => state.compare);
    const getFav = useSelector((state) => state.wishList);

    const getSubtotal = (cart) => {
        return cart.reduce((total, item) => {
            return total + item.orderedPrice;
        }, 0);
    };

    useEffect(() => {
        setSubtotal(getSubtotal(getData.cart));
    }, [getData.cart]);

    const { t } = useTranslation();

    const [search, setSearch] = useState('');
    const [showResults, setShowResults] = useState(false);
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

    const handleSearchInputChange = (event) => {
        setSearch(event.target.value);
        setShowResults(true);

    };

    const handleSearchBlur = () => {
        // setShowResults(false);
    };

    const navigate = useNavigate();
    
    const navigateToProductDetails = (service) => {
        // navigate(`/product-details/${product.id}`, { state: { product } });
        navigate(`/job-details/${service._id}`, { state: { service } });
        setShowResults(false);

    }

    const handleSearchResult = () =>{
        navigate(`/search-result`, { state: { search } });
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior of Enter key
            handleSearchResult();
        }
    };

    const btnRef = useRef();
    useEffect(() => {
        const closeMenu = (e) => { if (!btnRef.current.contains(e.target)) { setShowResults(false); } };

        document.body.addEventListener("mousedown", closeMenu);

        return () => document.body.removeEventListener("mousedown", closeMenu);
    }, []);

    return (
        <div className="w-full h-[86px] bg-white shadow-sm lg:block hidden  sticky top-0 z-[10]">
            <div className="container-x w-11/12 mx-auto h-full">
                <div className="relative h-full">
                    <div className="flex justify-between items-center h-full">
                        <div><Link to={"/"}><img width="192" height="36" src={siteLogo} alt="logo" /></Link></div>
                        <div className="relative">
                            <div className="w-[517px] h-[44px] flex items-center  border border-gray-border bg-white search-com">
                                <div className="flex-1 bg-red-500 h-full">
                                    <form action="#" className="h-full">
                                        <input
                                            type="text"
                                            className="search-input"
                                            placeholder={t('searchPlaceholder')}
                                            value={search}
                                            onChange={handleSearchInputChange}
                                            onBlur={handleSearchBlur}
                                            onKeyDown={handleKeyDown}
                                            
                                        />
                                    </form>
                                </div>

                                <button onClick={handleSearchResult} className="w-[93px] h-full primary-bg-color text-sm font-600 search-btn" type="button">
                                    {t('search')}
                                </button>
                            </div>

                            {showResults && (
                                <div className="search-results-dropdown absolute bg-white border border-gray-border w-full mt-2 z-10" ref={btnRef}>
                                    <ul>
                                        {services?.slice(0, 8).map((service) => (
                                            <li key={service._id}>
                                                <p className="p-2 cursor-pointer" onClick={() => navigateToProductDetails(service)}>
                                                    {service.TITLE}
                                                </p>
                                                <hr />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="flex space-x-6 items-center">
                            
                            <div>
                                <button type="button">
                                    <Link to={"/post-a-job"}>
                                        <span>
                                            <img width="21" height="20" src={postIcon} className='' alt=''/>
                                        </span>
                                    </Link>
                                </button>
                            </div>
                            <div>
                                <button type="button">
                                    <Link to={"/account"}>
                                        <span>
                                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.992 19.729C19.9004 18.043 19.438 16.4886 18.617 15.1176C17.6046 13.4237 16.2096 12.1244 14.4679 11.2475C14.0773 11.0522 13.878 10.9645 13.3878 10.7772L12.9334 10.6138L13.4954 10.1833C14.5476 9.38621 15.3408 8.08689 15.6118 6.70387C15.6955 6.28936 15.7035 5.22918 15.6317 4.78278C15.4643 3.77043 14.9582 2.70227 14.2766 1.92507C13.4356 0.976485 12.2439 0.30291 11.0084 0.079713C10.7971 0.0398565 10.1515 0 9.75289 0C9.60542 0 9.55361 0.00398565 9.53766 0.0079713H9.53368C9.49781 0.011957 9.42607 0.0239139 9.33838 0.0358709H9.32642C9.25468 0.0438422 9.17896 0.0557991 9.10323 0.0677561C8.1666 0.195297 7.01873 0.73336 6.25349 1.41092C5.27302 2.27581 4.59147 3.50339 4.38023 4.78278C4.3045 5.22918 4.31646 6.28936 4.40016 6.70387C4.67118 8.08689 5.46433 9.38621 6.51654 10.1833L7.07852 10.6138L6.62415 10.7772C6.13392 10.9645 5.93464 11.0522 5.54404 11.2475C3.80231 12.1244 2.40335 13.4237 1.39498 15.1176C0.569948 16.4926 0.107613 18.043 0.0159426 19.729L0 20H0.255082H1.1957H18.8123H19.4938H20.008L19.992 19.729ZM5.56397 4.98605C5.73934 3.92188 6.28537 2.95735 7.10642 2.25986C7.91949 1.57035 8.94779 1.19171 10 1.19171C10.2352 1.19171 10.4743 1.21164 10.7094 1.24751C13.1606 1.64607 14.8386 3.95775 14.444 6.39299C14.2686 7.45715 13.7226 8.42168 12.9016 9.11917C12.0885 9.80869 11.0602 10.1873 10.008 10.1873C9.77282 10.1873 9.53368 10.1674 9.29852 10.1315C6.84735 9.72898 5.16939 7.42128 5.56397 4.98605ZM2.54285 15.5281C3.73057 13.7146 5.31287 12.4751 7.25389 11.8414C8.17059 11.5424 9.09526 11.391 10.004 11.391C10.9127 11.391 11.8374 11.5424 12.7541 11.8414C14.6951 12.4751 16.2814 13.7146 17.4651 15.5281C18.047 16.4169 18.5134 17.6963 18.7086 18.8721H1.29932C1.49462 17.6963 1.96094 16.4169 2.54285 15.5281Z" fill="black">
                                                </path>
                                            </svg>
                                        </span>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Middlebar;