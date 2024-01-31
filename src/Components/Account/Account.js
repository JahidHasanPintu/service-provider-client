import React from 'react';
import './Account.css'
import Breadcumbs from '../../Shared/Breadcumbs/Breadcumbs';
import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import { Outlet, Route, Routes } from 'react-router-dom';
import MyOrders from './MyOrders/MyOrders';
import Settings from './Settings/Settings';
import Search from './Search/Search';
import InvoiceModal from './MyOrders/InvoiceModal';
import AllProducts from './AllProducts/AllProducts';
import AddNewProduct from './AllProducts/AddNewProduct';
import EditProduct from './AllProducts/EditProduct';
import MyProducts from './MyProducts/MyProducts';

const Account = () => {
   
    return (
        <div>
            <Breadcumbs name={"Account"} path={"/account"} />
            <section className="py-5 w-11/12 mx-auto text-start">
                <div className="container">

                    <div className="bg-white shadow rounded-lg grid grid-cols-5">
                        <Sidebar />
                        <div className="h-full ml-2 p-3 space-y-2 col-span-4  bg-gray-100 text-gray-900">
                            <Routes>
                            
                                <Route path="/" element={<Dashboard/>}></Route>
                                <Route path="/products" element={<AllProducts/>}></Route>
                                <Route path="/my-products" element={<MyProducts/>}></Route>
                                <Route path="/edit-product" element={<EditProduct/>}></Route>
                                <Route path="/edit-product/:prodID" element={<EditProduct/>}></Route>
                                <Route path="/add-products" element={<AddNewProduct/>}></Route>
                                <Route path="/my-order" element={<MyOrders/>}></Route>
                                <Route path="/invoice" element={<InvoiceModal/>}></Route>
                                <Route path="/invoice/:inVID" element={<InvoiceModal/>}></Route>
                                <Route path="/settings" element={<Settings/>}></Route>
                                <Route path="/search" element={<Search/>}></Route>
                                <Route path="/*" element={<Outlet />} />
                                
                            </Routes>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Account;