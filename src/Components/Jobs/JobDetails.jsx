import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../api/apiURL';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import Bids from './Bids';
import './Job.css'
const JobDetails = () => {
    const location = useLocation();
    const service = location?.state.service;
    const baseURL = getApiUrl();
    const getData = useSelector((state) => state.authReducer);
    const user = getData.user.user;
    const navigate = useNavigate();
    const API_URL = `${baseURL}/bids/create`; // Replace with your API URL
    const [formData, setFormData] = useState({
        USER_ID: user._id,
        SERVICE_ID: service._id,
        DETAILS: '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

   

    const [bids, setBids] = useState([]);
    const [totalBids, setTotalBids] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);

        const fetchServices = async () => {
            try {
                const url = `${baseURL}/bids?serviceId=${service._id}`;
                const response = await fetch(url);
                const data = await response.json();
                setBids(data.bids);
                setTotalBids(data.totalBids);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };


        fetchServices();

    }, [baseURL, service._id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Login to bid !!");
        } else {
            // Check if the user has already placed a bid for the same service
            const hasBid = bids.some((bid) => bid.USER_ID._id === user._id && bid.SERVICE_ID === formData.SERVICE_ID);
    
            if (hasBid) {
                toast.error("You already bid for this task");
            }else if(service.USER_ID._id === user._id){
                toast.error(" You can't Bid your own task ");
            } else {
                try {
                    // Send a POST request to the API with formData
                    const response = await axios.post(API_URL, formData);
                    toast.success("Bid placed successfully");
                    console.log('Data successfully submitted:', response.data);
                    // navigate("/admin")
                } catch (error) {
                    console.error('Error submitting data:', error);
                    toast.error("Failed!", error);
                }
            }
        }
    };
    

    return (
        <div>
            <div className="content-area py-5 w-full">
                <div className="container-x w-11/12 mx-auto text-start">
                    <div className="blog-article lg:flex lg:space-x-[30px] mb-7">
                        <div className="flex-1">
                            {/* <div className="img w-full h-[457px]"><img src={blogImg1} alt="blog" className="w-full h-full object-cover"/></div> */}
                            <div className="blog pl-[24px] pt-[24px]">
                                <div className="short-data flex space-x-9 items-center mb-3">
                                    <div className="flex space-x-1.5 items-center"><span><svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.761 14.9996C1.55973 14.9336 1.35152 14.8896 1.16065 14.7978C0.397206 14.4272 -0.02963 13.6273 0.00160193 12.743C0.0397743 11.6936 0.275749 10.7103 0.765049 9.7966C1.42439 8.56373 2.36829 7.65741 3.59327 7.07767C3.67309 7.04098 3.7529 7.00428 3.85007 6.95658C2.68061 5.9512 2.17396 4.67062 2.43422 3.10017C2.58691 2.18285 3.03804 1.42698 3.72514 0.847238C5.24163 -0.42967 7.34458 -0.216852 8.60773 1.1738C9.36424 2.00673 9.70779 3.01211 9.61757 4.16426C9.52734 5.31642 9.01375 6.23374 8.14619 6.94924C8.33359 7.04098 8.50363 7.11436 8.6702 7.20609C10.1485 8.006 11.1618 9.24254 11.6997 10.9011C11.9253 11.5945 12.0328 12.3137 11.9912 13.0476C11.9357 14.0163 11.2243 14.8235 10.3151 14.9703C10.2908 14.974 10.2665 14.9886 10.2387 14.9996C7.41051 14.9996 4.58575 14.9996 1.761 14.9996ZM6.00507 13.8475C7.30293 13.8475 8.60079 13.8401 9.89518 13.8512C10.5684 13.8548 10.9571 13.3338 10.9015 12.7577C10.8807 12.5486 10.8773 12.3394 10.846 12.1303C10.6309 10.6185 9.92294 9.41133 8.72225 8.5784C7.17106 7.50331 5.50883 7.3602 3.84313 8.23349C2.05944 9.16916 1.15718 10.7506 1.09125 12.8568C1.08778 13.0072 1.12595 13.1723 1.18494 13.3044C1.36193 13.6934 1.68466 13.8438 2.08026 13.8438C3.392 13.8475 4.70027 13.8475 6.00507 13.8475ZM5.99119 6.53462C7.38969 6.54195 8.53833 5.33843 8.54527 3.85238C8.55221 2.37733 7.41745 1.16647 6.00507 1.15179C4.62046 1.13344 3.45794 2.35531 3.45099 3.8377C3.44405 5.31275 4.58922 6.52728 5.99119 6.53462Z" fill="#189fcd"></path></svg></span><span className="text-base text-qgraytwo capitalize">By {service?.USER_ID?.name}</span></div>
                                    <div className="flex space-x-1.5 items-center"><span><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.73636 12.2092C3.29706 12.1112 2.89189 11.9493 2.52936 11.698C1.55268 11.0206 1.02382 10.0834 1.01102 8.89479C0.989696 7.06292 0.993961 5.23105 1.00676 3.39919C1.02382 1.68235 2.23934 0.297797 3.94108 0.0379278C4.11168 0.0123668 4.29081 0.00384653 4.46567 0.00384653C7.15688 0.00384653 9.8481 -0.000413627 12.5393 0.00384653C14.2069 0.00810668 15.5717 1.10723 15.9172 2.73034C15.9684 2.97317 15.9897 3.22452 15.9897 3.47587C15.994 5.25236 15.9982 7.0331 15.994 8.80958C15.9897 10.5136 14.8637 11.8939 13.2047 12.2134C12.9701 12.2603 12.7312 12.2688 12.4924 12.2688C11.2939 12.2731 10.0997 12.2731 8.90127 12.2688C8.77332 12.2688 8.66669 12.2986 8.56007 12.3711C7.33175 13.1933 6.10343 14.0112 4.87511 14.8334C4.71731 14.9399 4.55097 15.0166 4.35478 14.9953C3.98799 14.957 3.74489 14.6843 3.74062 14.3009C3.73636 13.6747 3.74062 13.0442 3.74062 12.4179C3.73636 12.354 3.73636 12.2901 3.73636 12.2092ZM5.09262 13.0442C5.16939 12.9973 5.21631 12.9632 5.26322 12.9334C6.1802 12.3242 7.09717 11.715 8.00988 11.0973C8.20607 10.9652 8.40226 10.9098 8.63684 10.9098C9.94193 10.9141 11.2428 10.9141 12.5478 10.9098C13.742 10.9056 14.6334 10.0109 14.6334 8.81384C14.6334 7.02458 14.6334 5.23531 14.6334 3.44605C14.6334 2.26173 13.7378 1.36284 12.5521 1.36284C9.85663 1.36284 7.15688 1.36284 4.46141 1.36284C3.27147 1.36284 2.37582 2.26173 2.37582 3.45457C2.37582 5.23957 2.37582 7.02032 2.37582 8.80532C2.37582 9.9726 3.2075 10.8459 4.37611 10.9056C4.84952 10.9311 5.09262 11.1825 5.09689 11.6554C5.09262 12.1069 5.09262 12.5543 5.09262 13.0442Z" fill="#189fcd"></path><path d="M8.48317 5.45638C7.13543 5.45638 5.79196 5.45638 4.44422 5.45638C3.93668 5.45638 3.60401 4.99628 3.77461 4.54044C3.87697 4.26353 4.09022 4.12295 4.38024 4.09313C4.43142 4.08887 4.48687 4.08887 4.53805 4.08887C7.17808 4.08887 9.81385 4.08887 12.4539 4.08887C12.569 4.08887 12.6885 4.09739 12.7994 4.13147C13.115 4.22945 13.2984 4.5447 13.2514 4.88552C13.2088 5.19651 12.9273 5.44786 12.5946 5.45212C12.2108 5.46064 11.8269 5.45212 11.4473 5.45212C10.4621 5.45638 9.47265 5.45638 8.48317 5.45638Z" fill="#189fcd"></path><path d="M8.48349 8.17895C7.58784 8.17895 6.69646 8.18321 5.80507 8.17895C5.32739 8.17469 5.01178 7.78701 5.11841 7.3397C5.18238 7.05853 5.42975 6.84552 5.71977 6.82848C5.76242 6.82422 5.80507 6.82422 5.84772 6.82422C7.6177 6.82422 9.39194 6.82422 11.1619 6.82422C11.5586 6.82422 11.8272 7.02871 11.8955 7.37378C11.9765 7.78275 11.6822 8.16617 11.2643 8.17895C10.8889 8.19173 10.5094 8.18321 10.1298 8.18321C9.5796 8.17895 9.03368 8.17895 8.48349 8.17895Z" fill="#189fcd"></path></svg></span><span className="text-base text-qgraytwo"> Total {bids ? totalBids : 0} Bids for this task</span></div>
                                </div>
                                <div className="details">
                                    <h1 className="text-[22px] text-qblack font-semibold line-clamp-2 mb-1 capitalize">{service.TITLE}</h1>
                                    <p className="text-qgraytwo text-[15px] leading-[30px] mb-10">{service.DESCRIPTION}</p>
                                </div>
                            </div>
                            <div className="extra-content w-full">
                                {/* <div className="w-full sm:flex sm:space-x-[30px]  mb-3">
                        <div className="sm:w-[370px] h-[235px]"><img src={blogImg1} alt="blog" className="w-full h-full object-cover"/></div>
                        <div className="flex-1 h-[235px]"><img src={blogImg2} alt="blog" className="w-full h-full object-cover"/></div>
                    </div> */}
                                <div className="pl-[24px] mb-10">
                                    <h1 className="text-[22px] font-semibold text-qblack mb-2">What i am expecting from you: </h1>
                                    <p className="text-[15px] text-qgraytwo mb-7">

                                    </p>
                                    <ul className="flex flex-col space-y-3.5">
                                        <li className="flex space-x-5 items-center"><span><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12.5" cy="12.5" r="12.5" fill="#189fcd"></circle><path d="M10.1691 13.2566C10.5172 12.8649 10.8498 12.4803 11.198 12.1029C12.7761 10.3864 14.4973 8.80535 16.4699 7.47353C16.6749 7.33465 16.8876 7.20289 17.1042 7.0747C17.1739 7.03552 17.2628 7.00347 17.344 7.00347C17.7888 6.99635 18.2337 6.99991 18.6746 6.99991C18.8138 6.99991 18.926 7.04265 18.9763 7.16728C19.0266 7.28836 18.9879 7.39163 18.8835 7.48065C17.0772 8.99765 15.588 10.7639 14.1724 12.5872C12.8689 14.2644 11.6621 16.0022 10.5288 17.7863C10.4901 17.8504 10.4398 17.918 10.3741 17.9572C10.2348 18.0462 10.0763 17.9964 9.97183 17.8432C9.79777 17.5868 9.63532 17.3233 9.44966 17.074C8.36278 15.6318 7.26817 14.1896 6.17742 12.751C6.13488 12.6976 6.08846 12.6441 6.04978 12.5872C5.97243 12.4732 5.97629 12.3486 6.07686 12.256C6.36695 11.9853 6.66478 11.7147 6.96261 11.4476C7.07864 11.3444 7.20242 11.3515 7.35713 11.4476C7.83675 11.7539 8.31637 12.0637 8.79212 12.3699C9.24853 12.6655 9.70495 12.9575 10.1691 13.2566Z" fill="#222222"></path></svg></span><span className="text-[15px] text-black font-medium">I am looking for {service.TYPE} kinds of work</span></li>
                                        <li className="flex space-x-5 items-center"><span><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12.5" cy="12.5" r="12.5" fill="#189fcd"></circle><path d="M10.1691 13.2566C10.5172 12.8649 10.8498 12.4803 11.198 12.1029C12.7761 10.3864 14.4973 8.80535 16.4699 7.47353C16.6749 7.33465 16.8876 7.20289 17.1042 7.0747C17.1739 7.03552 17.2628 7.00347 17.344 7.00347C17.7888 6.99635 18.2337 6.99991 18.6746 6.99991C18.8138 6.99991 18.926 7.04265 18.9763 7.16728C19.0266 7.28836 18.9879 7.39163 18.8835 7.48065C17.0772 8.99765 15.588 10.7639 14.1724 12.5872C12.8689 14.2644 11.6621 16.0022 10.5288 17.7863C10.4901 17.8504 10.4398 17.918 10.3741 17.9572C10.2348 18.0462 10.0763 17.9964 9.97183 17.8432C9.79777 17.5868 9.63532 17.3233 9.44966 17.074C8.36278 15.6318 7.26817 14.1896 6.17742 12.751C6.13488 12.6976 6.08846 12.6441 6.04978 12.5872C5.97243 12.4732 5.97629 12.3486 6.07686 12.256C6.36695 11.9853 6.66478 11.7147 6.96261 11.4476C7.07864 11.3444 7.20242 11.3515 7.35713 11.4476C7.83675 11.7539 8.31637 12.0637 8.79212 12.3699C9.24853 12.6655 9.70495 12.9575 10.1691 13.2566Z" fill="#222222"></path></svg></span><span className="text-[15px] text-black font-medium">You have to skilled in {service.SKILLS}</span></li>
                                        <li className="flex space-x-5 items-center"><span><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12.5" cy="12.5" r="12.5" fill="#189fcd"></circle><path d="M10.1691 13.2566C10.5172 12.8649 10.8498 12.4803 11.198 12.1029C12.7761 10.3864 14.4973 8.80535 16.4699 7.47353C16.6749 7.33465 16.8876 7.20289 17.1042 7.0747C17.1739 7.03552 17.2628 7.00347 17.344 7.00347C17.7888 6.99635 18.2337 6.99991 18.6746 6.99991C18.8138 6.99991 18.926 7.04265 18.9763 7.16728C19.0266 7.28836 18.9879 7.39163 18.8835 7.48065C17.0772 8.99765 15.588 10.7639 14.1724 12.5872C12.8689 14.2644 11.6621 16.0022 10.5288 17.7863C10.4901 17.8504 10.4398 17.918 10.3741 17.9572C10.2348 18.0462 10.0763 17.9964 9.97183 17.8432C9.79777 17.5868 9.63532 17.3233 9.44966 17.074C8.36278 15.6318 7.26817 14.1896 6.17742 12.751C6.13488 12.6976 6.08846 12.6441 6.04978 12.5872C5.97243 12.4732 5.97629 12.3486 6.07686 12.256C6.36695 11.9853 6.66478 11.7147 6.96261 11.4476C7.07864 11.3444 7.20242 11.3515 7.35713 11.4476C7.83675 11.7539 8.31637 12.0637 8.79212 12.3699C9.24853 12.6655 9.70495 12.9575 10.1691 13.2566Z" fill="#222222"></path></svg></span><span className="text-[15px] text-black font-medium">Experience should be {service.EXPERIENCE} year</span></li>
                                        <li className="flex space-x-5 items-center"><span><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12.5" cy="12.5" r="12.5" fill="#189fcd"></circle><path d="M10.1691 13.2566C10.5172 12.8649 10.8498 12.4803 11.198 12.1029C12.7761 10.3864 14.4973 8.80535 16.4699 7.47353C16.6749 7.33465 16.8876 7.20289 17.1042 7.0747C17.1739 7.03552 17.2628 7.00347 17.344 7.00347C17.7888 6.99635 18.2337 6.99991 18.6746 6.99991C18.8138 6.99991 18.926 7.04265 18.9763 7.16728C19.0266 7.28836 18.9879 7.39163 18.8835 7.48065C17.0772 8.99765 15.588 10.7639 14.1724 12.5872C12.8689 14.2644 11.6621 16.0022 10.5288 17.7863C10.4901 17.8504 10.4398 17.918 10.3741 17.9572C10.2348 18.0462 10.0763 17.9964 9.97183 17.8432C9.79777 17.5868 9.63532 17.3233 9.44966 17.074C8.36278 15.6318 7.26817 14.1896 6.17742 12.751C6.13488 12.6976 6.08846 12.6441 6.04978 12.5872C5.97243 12.4732 5.97629 12.3486 6.07686 12.256C6.36695 11.9853 6.66478 11.7147 6.96261 11.4476C7.07864 11.3444 7.20242 11.3515 7.35713 11.4476C7.83675 11.7539 8.31637 12.0637 8.79212 12.3699C9.24853 12.6655 9.70495 12.9575 10.1691 13.2566Z" fill="#222222"></path></svg></span><span className="text-[15px] text-black font-medium">You have to complete this task within {service.DURATION}</span></li>
                                    </ul>
                                </div>
                                <div className="w-full h-[1px] bg-[#DCDCDC]"></div>
                                <div className="comment-area w-full mt-4">
                                    <div className="w-full sm:flex justify-between items-center mb-[30px]">
                                        <div className="tags flex space-x-5 items-center mb-5 sm:mb-0"><span className="text-2xl text-qblack">Tags:</span><span className="text-base text-qgraytwo hover:text-qyellow">#{service.SKILLS}</span><span className="text-base text-qgraytwo hover:text-qyellow">#{service.TYPE}</span><span className="text-base text-qgraytwo hover:text-qyellow">#Service</span></div>
                                        <div className="tags flex space-x-5 items-center"><span className="text-2xl text-qblack">Share:</span>
                                            <div className="flex space-x-2.5 items-center"><span className="text-base "><svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.5284 17.2744C34.5284 26.7975 26.799 34.5175 17.2642 34.5175C7.72946 34.5175 0 26.7975 0 17.2744C0 7.75127 7.72946 0.03125 17.2642 0.03125C26.799 0.03125 34.5284 7.75127 34.5284 17.2744Z" fill="#189fcd"></path><path d="M20.7181 16.9846H18.6418V25H15.4961V16.9846H14V14.1677H15.4961V12.3448C15.4961 11.0412 16.0837 9 18.6698 9L21 9.01027V11.7446H19.3093C19.032 11.7446 18.6421 11.8906 18.6421 12.5124V14.1703H20.9929L20.7181 16.9846Z" fill="#222222"></path></svg></span><span className="text-base"><svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.7433 17.2744C34.7433 26.7975 27.0138 34.5175 17.4791 34.5175C7.9443 34.5175 0.214844 26.7975 0.214844 17.2744C0.214844 7.75127 7.9443 0.03125 17.4791 0.03125C27.0138 0.03125 34.7433 7.75127 34.7433 17.2744Z" fill="#189fcd"></path><path d="M25 13.4206C24.4483 13.6615 23.8548 13.8243 23.2324 13.8971C23.8679 13.5223 24.3555 12.9292 24.5857 12.2214C23.9911 12.5687 23.3322 12.8206 22.6315 12.9563C22.0701 12.3678 21.2703 12 20.3847 12C18.6854 12 17.3072 13.3567 17.3072 15.0294C17.3072 15.2669 17.3345 15.498 17.3873 15.7199C14.8297 15.5936 12.562 14.3876 11.044 12.5542C10.7792 13.0015 10.6272 13.5223 10.6272 14.0774C10.6272 15.1282 11.1709 16.0558 11.9962 16.5989C11.492 16.5833 11.0172 16.4471 10.6025 16.2196C10.6022 16.2325 10.6022 16.2454 10.6022 16.258C10.6022 17.7258 11.6635 18.9501 13.071 19.2282C12.813 19.2978 12.5406 19.3347 12.2604 19.3347C12.0616 19.3347 11.8691 19.3159 11.6814 19.2807C12.0729 20.4839 13.2092 21.3598 14.5561 21.3845C13.5027 22.1971 12.1759 22.6813 10.7337 22.6813C10.4859 22.6813 10.2403 22.667 10 22.6388C11.3612 23.4987 12.9792 24 14.717 24C20.3775 24 23.4731 19.3839 23.4731 15.3803C23.4731 15.249 23.4701 15.1182 23.4642 14.9885C24.0659 14.5615 24.5876 14.0281 25 13.4206Z" fill="#222222"></path></svg></span><span className="text-base "><svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.9581 17.2744C34.9581 26.7975 27.2287 34.5175 17.6939 34.5175C8.15914 34.5175 0.429688 26.7975 0.429688 17.2744C0.429688 7.75127 8.15914 0.03125 17.6939 0.03125C27.2287 0.03125 34.9581 7.75127 34.9581 17.2744Z" fill="#189fcd"></path><path d="M25 18.9697V24H21.9987V19.3068C21.9987 18.1284 21.5654 17.3236 20.4787 17.3236C19.6494 17.3236 19.1567 17.8654 18.9392 18.39C18.8602 18.5775 18.8398 18.8378 18.8398 19.1008V23.9998H15.8383C15.8383 23.9998 15.8786 16.051 15.8383 15.2282H18.84V16.4712C18.834 16.481 18.8255 16.4906 18.8201 16.4999H18.84V16.4712C19.2389 15.8748 19.9502 15.0222 21.545 15.0222C23.5196 15.0222 25 16.2759 25 18.9697ZM12.6984 11C11.6717 11 11 11.6549 11 12.5153C11 13.3575 11.6522 14.0313 12.659 14.0313H12.6785C13.7253 14.0313 14.3762 13.3575 14.3762 12.5153C14.3563 11.6549 13.7253 11 12.6984 11ZM11.1784 24H14.1788V15.2282H11.1784V24Z" fill="#222222"></path></svg></span><span className="text-base "><svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35.173 17.2744C35.173 26.7975 27.4435 34.5175 17.9088 34.5175C8.37399 34.5175 0.644531 26.7975 0.644531 17.2744C0.644531 7.75127 8.37399 0.03125 17.9088 0.03125C27.4435 0.03125 35.173 7.75127 35.173 17.2744Z" fill="#189fcd"></path><path d="M18.0022 23.9937C19.8237 23.9937 21.6452 23.976 23.4668 23.9997C25.3 24.0234 26.571 22.7553 26.8873 21.3923C26.9575 21.102 26.9927 20.7938 26.9927 20.4916C27.0044 18.5006 26.9985 16.5095 26.9985 14.5184C26.9927 12.5096 25.5109 11.0044 23.5253 11.0044C19.8354 10.9985 16.1455 10.9985 12.4615 11.0044C10.4877 11.0044 9.00586 12.5155 9 14.5066C9 16.5036 9 18.5006 9 20.4975C9.00586 22.4412 10.4232 23.9463 12.3385 23.9819C14.2244 24.0175 16.1162 23.9878 18.0022 23.9937ZM15.6535 20.2783C15.6535 18.3998 15.6535 16.5628 15.6535 14.6962C17.2291 15.6325 18.7812 16.551 20.3626 17.4872C18.7753 18.4294 17.2291 19.342 15.6535 20.2783Z" fill="#222222"></path></svg></span></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="lg:w-[370px] w-full">
                            <div data-aos="fade-up" className="w-full h-[358px] aos-init aos-animate" >
                                <div className="w-full h-full p-[30px] bg-black bg-opacity-75 flex flex-col justify-between">
                                    <div>
                                        <h1 className="text-[22px] text-white font-bold mb-5">Bid  Here</h1>
                                        <div className="w-full h-[1px] bg-[#615B9C] mb-5"></div>
                                        <h2 className="text-base text-white font-bold leading-[26px] line-clamp-2">BUDGET : ৳ {service?.BUDGET}</h2>
                                        <p className="text-base text-white leading-[26px] line-clamp-2">Offer your price and add note if any.</p>
                                        
                                    </div>
                                    <div>
                                        <div className="w-full mb-3.5"><input name='DETAILS' onChange={handleChange} type="text" className="w-full h-[60px] bg-[#ECEAEC] pl-5 focus:outline-none focus:ring-0 placeholder:text-[#9A9A9A]" placeholder="Enter Your Price and Note" /></div><button type="button" onClick={handleSubmit} className="w-full h-[60px]"><span className="product-button w-full h-full"
                                            style={{ fontSize: '18px' }}
                                        >BID NOW</span></button></div>
                                </div>
                            </div>
                            <div data-aos="fade-up" className="latest-post-widget w-full bg-white p-[30px] mb-[30px] aos-init aos-animate">
                                <h1 className="text-[22px] text-qblack font-bold mb-5">Latest Bid</h1>
                                <div className="w-full h-[1px] bg-[#DCDCDC] mb-5"></div>
                                {loading ? (
                                    <Loading />
                                ) : (
                                    <ul className="flex flex-col space-y-5">
                                        {
                                            bids?.map(bid =>
                                                <Bids key={bid._id} bid={bid} />
                                            )
                                        }
                                        {
                                            totalBids?(
                                                <p></p>
                                            ):(
                                                <h2>No Bids Yet</h2>
                                                )}
                                    </ul>
                                )}

                            </div>
                            {/* <div data-aos="fade-up" className="categories-widget w-full bg-white p-[30px] mb-[30px] aos-init aos-animate">
                                <h1 className="text-[22px] text-qblack font-bold mb-5">Categories</h1>
                                <div className="w-full h-[1px] bg-[#DCDCDC] mb-5"></div>
                                <ul className="flex flex-col space-y-5">
                                    <li className="flex justify-between items-center group"><span className="text-base text-qgraytwo group-hover:text-qyellow">Development</span><span className="text-base text-qgraytwo group-hover:text-qyellow">(6)</span></li>
                                    <li className="flex justify-between items-center group"><span className="text-base text-qgraytwo group-hover:text-qyellow">Guide</span><span className="text-base text-qgraytwo group-hover:text-qyellow">(6)</span></li>
                                    <li className="flex justify-between items-center group"><span className="text-base text-qgraytwo group-hover:text-qyellow">Inspiration</span><span className="text-base text-qgraytwo group-hover:text-qyellow">(6)</span></li>
                                    <li className="flex justify-between items-center group"><span className="text-base text-qgraytwo group-hover:text-qyellow">Latest News</span><span className="text-base text-qgraytwo group-hover:text-qyellow">(6)</span></li>
                                    <li className="flex justify-between items-center group"><span className="text-base text-qgraytwo group-hover:text-qyellow">Revenew</span><span className="text-base text-qgraytwo group-hover:text-qyellow">(6)</span></li>
                                    <li className="flex justify-between items-center group"><span className="text-base text-qgraytwo group-hover:text-qyellow">Start Up</span><span className="text-base text-qgraytwo group-hover:text-qyellow">(6)</span></li>
                                    <li className="flex justify-between items-center group"><span className="text-base text-qgraytwo group-hover:text-qyellow">Technology</span><span className="text-base text-qgraytwo group-hover:text-qyellow">(6)</span></li>
                                </ul>
                            </div> */}
                            {/* <div data-aos="fade-up" className="popular-tag-widget w-full bg-white p-[30px] mb-[30px] aos-init aos-animate">
                    <h1 className="text-[22px] text-qblack font-bold mb-5">Popular Tags</h1>
                    <div className="w-full h-[1px] bg-[#DCDCDC] mb-5"></div>
                    <div className="filter-items">
                        <div className="flex gap-[10px] flex-wrap"><span className="text-base bg-[#F9F3E9] hover:primary-bg-color text-[#9A9A9A] hover:text-qblack px-[14px] py-[6px] cursor-pointer mb-[5px]">Agency</span><span className="text-base bg-[#F9F3E9] hover:primary-bg-color text-[#9A9A9A] hover:text-qblack px-[14px] py-[6px] cursor-pointer mb-[5px]">Creative</span><span className="text-base bg-[#F9F3E9] hover:primary-bg-color text-[#9A9A9A] hover:text-qblack px-[14px] py-[6px] cursor-pointer mb-[5px]">Data</span><span className="text-base bg-[#F9F3E9] hover:primary-bg-color text-[#9A9A9A] hover:text-qblack px-[14px] py-[6px] cursor-pointer mb-[5px]">Technology</span><span className="text-base bg-[#F9F3E9] hover:primary-bg-color text-[#9A9A9A] hover:text-qblack px-[14px] py-[6px] cursor-pointer mb-[5px]">Development</span><span className="text-base bg-[#F9F3E9] hover:primary-bg-color text-[#9A9A9A] hover:text-qblack px-[14px] py-[6px] cursor-pointer mb-[5px]">Business</span><span className="text-base bg-[#F9F3E9] hover:primary-bg-color text-[#9A9A9A] hover:text-qblack px-[14px] py-[6px] cursor-pointer mb-[5px]">Idea</span><span className="text-base bg-[#F9F3E9] hover:primary-bg-color text-[#9A9A9A] hover:text-qblack px-[14px] py-[6px] cursor-pointer mb-[5px]">Generic</span></div>
                    </div>
                </div> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;