import React, { useEffect, useRef, useState } from 'react';
import './Head.css';
import siteLogo from '../../assets/logos/service logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
const Head = () => {
    const [categories] = useCategories(1, 100);
    const getData = useSelector((state) => state.cartReducer);

    const { t } = useTranslation();

    const [showMenu, setShowMenu] = useState('0px');
    const [showShopMenu, setShowShopMenu] = useState(false);
    const handleMenuView = () => {
        if (showMenu === '0px') {
            setShowMenu('924px');
        } else {
            setShowMenu('0px');
        }

    }
    const handleShopMenuView = () => {
        setShowShopMenu(!showShopMenu);

    }

    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [products, total] = useProducts(1, 100, searchTerm);

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
        setShowResults(true);

    };

    const handleSearchBlur = () => {
        // setShowResults(false);
    };

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        // console.log(categoryId);



    };
    const navigate = useNavigate();
    const navigateToProductDetails = (product) => {
        navigate(`/product-details/${product.id}`, { state: { product } });
        setShowResults(false);

    }
    const navigateToCategories = (catID) => {
        navigate(`/buy-sell/${catID}`);


    }

    // const [open, setShowResult] = useState(false);
    const btnRef = useRef();
    useEffect(() => {
        const closeMenu = (e) => { if (!btnRef.current.contains(e.target)) { setShowResults(false); } };

        document.body.addEventListener("mousedown", closeMenu);

        return () => document.body.removeEventListener("mousedown", closeMenu);
    }, []);
    
    const [showFurnitureMenu, setShowFurnitureMenu] = useState(false);
    const [showKitchenMenu, setShowKitchenMenu] = useState(false);

    return (
        <div className="text-start">
            <header className="">
                <div className="w-full h-[86px] bg-white mobile-middlebar block lg:hidden">
                    <div className="container-x mx-auto h-full">
                        <div className="relative h-full">
                            <div className="flex justify-between items-center h-full">


                                <div className="relative">
                                    <div className="w-[450px] h-[44px] flex items-center  border border-gray-border bg-white search-com m-4">
                                        <div className="flex-1 bg-red-500 h-full">
                                            <form action="#" className="h-full">
                                                <input
                                                    type="text"
                                                    className="search-input"
                                                    placeholder={t('searchPlaceholder')}
                                                    value={searchTerm}
                                                    onChange={handleSearchInputChange}
                                                    onBlur={handleSearchBlur}
                                                />
                                            </form>
                                        </div>

                                        <button className="w-[93px] h-full primary-bg-color text-sm font-600 search-btn" type="button">
                                            {t('search')}
                                        </button>
                                    </div>

                                    {showResults && (
                                        <div className="search-results-dropdown absolute bg-white border border-gray-border w-full mt-2 z-10">
                                            <ul>
                                                {products?.slice(0, 8).map((product) => (
                                                    <li key={product.id}>
                                                        <p className="p-2 cursor-pointer" onClick={() => navigateToProductDetails(product)}>
                                                            {product.name}
                                                        </p>
                                                        <hr />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="quomodo-shop-drawer lg:hidden block w-full h-[60px] bg-white">
                    <div className="w-full h-full flex justify-between items-center px-5">
                        <div><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7"></path></svg></div>
                        <div><Link to={"/"}><img width="152" height="36" src={siteLogo} alt="logo" /></Link></div>
                        <div className="cart relative cursor-pointer"><Link to={"/cart"} ><span><svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.1568 5.1772C16.0284 4.84626 15.7343 4.81766 14.2887 4.81766H13.0875V4.2947C13.0875 3.48165 12.9716 2.91374 12.6899 2.32949C12.1804 1.2713 11.3272 0.531797 10.2213 0.188601C9.68279 0.0251747 8.87923 -0.0442816 8.39047 0.0292604C7.03602 0.241715 5.88039 1.09562 5.29223 2.31315C5.00642 2.90966 4.89045 3.48165 4.89045 4.2947V4.82175H3.68511C2.23954 4.82175 1.94546 4.85035 1.81705 5.19354C1.75078 5.41008 1.12948 10.0637 0.864385 12.0697C0.632431 13.8184 0.417045 15.469 0.259648 16.711C-0.0137267 18.8519 -0.00544266 18.8846 0.00284141 18.9214V18.9255C0.0401198 19.0644 0.408761 19.428 0.520596 19.5342L1.00521 20H16.9438L17.3041 19.6854C17.4657 19.5424 18 19.0562 18 18.8152C18 18.6517 16.1899 5.27117 16.1568 5.1772ZM16.6911 18.5046C16.687 18.5332 16.6538 18.619 16.5958 18.6803L16.513 18.7702H1.46498L1.2496 18.5414L2.09871 12.2863C2.39694 10.0596 2.66203 8.11888 2.81943 6.95855C2.88984 6.45193 2.92298 6.19453 2.93955 6.06788C3.49872 6.06379 5.94252 6.0597 8.98278 6.0597H15.0302L15.0384 6.10465C15.1047 6.4315 16.6621 18.141 16.6911 18.5046ZM6.1372 4.82175V4.35598C6.1372 4.04139 6.17862 3.6083 6.22418 3.40811C6.46856 2.38669 7.30111 1.5573 8.34076 1.29173C8.77568 1.1855 9.48811 1.22228 9.92303 1.37753H9.92717C10.3828 1.5287 10.7556 1.77384 11.0994 2.14972C11.6544 2.74623 11.8408 3.28145 11.8408 4.27018V4.82175H6.1372Z" fill="black"></path></svg></span></Link><span className="w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] primary-bg-color text-qblack">{getData.cart.length}</span></div>
                    </div>
                </div>
                <div className="nav-widget-wrapper w-full  h-[60px]  z-30 primary-bg-color  quomodo-shop-nav-bar lg:block hidden">
                    <div className="container-x mx-auto h-full">
                        <div className="w-full h-full relative">
                            <div className="w-11/12 mx-auto h-full flex justify-between items-center">
                                <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">
                                    <div onClick={handleMenuView} className="category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative"><button type="button" className="w-full h-full flex justify-between items-center">
                                        <div className="flex space-x-3 items-center"><span><svg className="fill-current" width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="14" height="1"></rect><rect y="8" width="14" height="1"></rect><rect y="4" width="10" height="1"></rect></svg></span><span className="text-sm font-600 text-qblacktext">{t('allCategories')}</span></div>
                                        <div>
                                            <svg width="10" height="5" viewBox="0 0 10 5" fill="none" className="fill-current text-qblacktext" xmlns="http://www.w3.org/2000/svg"><rect x="9.18359" y="0.90918" width="5.78538" height="1.28564" transform="rotate(135 9.18359 0.90918)"></rect><rect x="5.08984" y="5" width="5.78538" height="1.28564" transform="rotate(-135 5.08984 5)"></rect></svg>
                                        </div></button>
                                        <div className="category-dropdown w-full absolute left-0 top-[53px] z-50 overflow-hidden" style={{ height: showMenu }} onMouseLeave={handleMenuView}
                                        >
                                            <ul className="categories-list">
                                                {
                                                    categories?.map(category => {
                                                        if (category.id !== 0) {
                                                            return <li key={category.id} className="category-item">


                                                                <div
                                                                    onClick={() => navigateToCategories(category.id)}
                                                                    className="flex justify-between items-center px-5 h-10 bg-white  transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:primary-bg-color">
                                                                    <div className="flex items-center space-x-6">
                                                                        <img className='w-4' src={category.cat_image} alt={category.cat_name} />
                                                                        <span className="text-xs font-400">{category.cat_name}</span></div>
                                                                    <div><span><svg className="fill-current" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.49805" y="0.818359" width="5.78538" height="1.28564" transform="rotate(45 1.49805 0.818359)"></rect><rect x="5.58984" y="4.90918" width="5.78538" height="1.28564" transform="rotate(135 5.58984 4.90918)"></rect></svg></span></div>
                                                                </div>

                                                            </li>;
                                                        }
                                                        return null; // Exclude brand with id 0
                                                    })
                                                }
                                                
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="nav">
                                        <ul className="nav-wrapper flex xl:space-x-5 space-x-5">

                                            <li><Link to={"/jobs"}><span className="flex items-center text-sm font-600 cursor-pointer primary-text-color" ><span> All Jobs</span></span></Link>

                                            </li>
                                            <li onClick={handleShopMenuView}>
                                                <span className="flex items-center text-sm font-600 cursor-pointer primary-text-color" ><span> Development & IT</span><span className="ml-1.5 "><svg width="10" height="5" viewBox="0 0 10 5" fill="none" className="fill-current" xmlns="http://www.w3.org/2000/svg"><rect x="9.18359" y="0.90918" width="5.78538" height="1.28564" transform="rotate(135 9.18359 0.90918)"></rect><rect x="5.08984" y="5" width="5.78538" height="1.28564" transform="rotate(-135 5.08984 5)"></rect></svg></span></span>
                                                {showShopMenu && (
                                                    <div className="sub-menu w-full absolute left-0 top-[60px] z-50 transition-all duration-300 ease-in-out " onMouseLeave={handleShopMenuView} >
                                                        <div className="mega-menu-wrapper w-full bg-white p-[30px] flex justify-between items-center transition-all duration-300 ease-in-out" style={{ minHeight: '295px', boxShadow: 'rgba(0, 0, 0, 0.14) 0px 15px 50px 0px' }}>
                                                            <div className="categories-wrapper flex-1 h-full flex justify-around -ml-[70px]">
                                                                <div>
                                                                    <div className="category">
                                                                        <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">Web Development</h1>
                                                                    </div>
                                                                    <div className="category-items">
                                                                        <ul className="flex flex-col space-y-2">
                                                                            <li><a href="/all-types"><span className="text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow">React Developer </span></a></li>
                                                                            <li><a href="/all-types"><span className="text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow">NodeJs Dev</span></a></li>
                                                                            <li><a href="/all-types"><span className="text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow">Mern Stack</span></a></li>
                                                                            <li><a href="/all-types"><span className="text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow">Bootstrap</span></a></li>
                                                                            <li><a href="/all-types"><span className="text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow">Tailwind CSS</span></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="category">
                                                                        <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">Mobile App</h1>
                                                                    </div>
                                                                    <div className="category-items">
                                                                        <ul className="flex flex-col space-y-2">
                                                                            <li><a href="/all-types"><span className="text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow">Java Dev</span></a></li>
                                                                            <li><a href="/all-types"><span className="text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow">React Native</span></a></li>
                                                                            <li><a href="/all-types"><span className="text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow">Flutter</span></a></li>
                                                                            <li><a href="/all-types"><span className="text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow">IOS Dev</span></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="category">
                                                                        <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">Programming Languages</h1>
                                                                    </div>
                                                                    <div className="category-items">
                                                                        <ul className="flex flex-col space-y-2">
                                                                            <li><a href="/all-types"><span className="text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow">C &amp; C++</span></a></li>
                                                                            <li><a href="/all-types"><span className="text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow">C# &amp; .NET CORE</span></a></li>
                                                                            <li><a href="/all-types"><span className="text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow">Python</span></a></li>
                                                                            <li><a href="/all-types"><span className="text-qgray text-sm font-400 border-b border-transparent hover:text-qyellow hover:border-qyellow">Java Script</span></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="thumbnil w-[348px] h-full">
                                                                <div className="w-full h-[235px]">
                                                                    <img width="" src="https://assets-global.website-files.com/6410ebf8e483b5bb2c86eb27/6410ebf8e483b53d6186fc53_ABM%20College%20Web%20developer%20main.jpg" alt="" className="w-full h-full object-contain" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )}


                                            </li>

                                            <li onClick={() => navigateToCategories(33)}><Link to={""}><span className="flex items-center text-sm font-600 cursor-pointer primary-text-color"><span>Buy and Sell</span></span></Link></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header >
        </div >
    );
};

export default Head;