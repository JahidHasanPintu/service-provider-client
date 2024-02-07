import React, { useEffect, useState } from 'react';
import { useOrders } from '../../../hooks/useOrders';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("");
    const [userID, setUserId] = useState(32);
    const [limit, setLimit] = useState(100);

    const navigate = useNavigate();

    const [stats, setStats] = useState([]);
    useEffect(() => {
      fetch("http://localhost:5000/stats/totals")
        .then((res) => res.json())
        .then((data) => setStats(data));
    }, []);
    
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/orders")
            .then((res) => res.json())
            .then((data) => setOrders(data.orders));
    }, []);



    return (
        <div>
            <div class="flex flex-col">

                <div class="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
                    <div class="shadow-lg bg-red-500 border-l-8 hover:bg-red-700 border-red-700 mb-2 p-2 md:w-1/4 mx-2">
                        <div class="p-4 flex flex-col">
                            <a href="#" class="no-underline text-white text-2xl">
                                {stats?.orderCount}
                            </a>
                            <a href="#" class="no-underline text-white text-lg">
                                Total Order
                            </a>
                        </div>
                    </div>

                    <div class="shadow bg-info border-l-8 hover:bg-info-700 border-info mb-2 p-2 md:w-1/4 mx-2">
                        <div class="p-4 flex flex-col">
                            <a href="#" class="no-underline text-white text-2xl">
                            {stats?.bidCount}
                            </a>
                            <a href="#" class="no-underline text-white text-lg">
                                Total Bids
                            </a>
                        </div>
                    </div>

                    <div class="shadow bg-warning border-l-8 hover:bg-warning border-warning mb-2 p-2 md:w-1/4 mx-2">
                        <div class="p-4 flex flex-col">
                            <a href="#" class="no-underline text-white text-2xl">
                            {stats?.serviceCount}
                            </a>
                            <a href="#" class="no-underline text-white text-lg">
                                Total Jobs
                            </a>
                        </div>
                    </div>

                    <div class="shadow bg-success border-l-8 hover:bg-success border-success mb-2 p-2 md:w-1/4 mx-2">
                        <div class="p-4 flex flex-col">
                            <a href="#" class="no-underline text-white text-2xl">
                            {stats?.productCount}
                            </a>
                            <a href="#" class="no-underline text-white text-lg">
                                Total Product
                            </a>
                        </div>
                    </div>
                </div>


                <div class="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 w-full">



                    <div class="rounded overflow-hidden shadow bg-white mx-2 w-full">
                        <div class="px-6 py-2 border-b border-grey-700">
                            <div class="font-bold text-xl">Recent Orders</div>
                        </div>
                        <div class="table-responsive">
                        <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Product Name</th>
                            <th className="py-2 px-4 border-b">paymentMethod</th>
                            <th className="py-2 px-4 border-b">orderStatus</th>
                            <th className="py-2 px-4 border-b">paymentStatus</th>
                            <th className="py-2 px-4 border-b">shippingCharge</th>
                            <th className="py-2 px-4 border-b">total</th>
                            
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {orders?.map((product, index) => (
                            <tr key={product._id}>
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b flex flex-col items-center">
                                    <img
                                        className="w-14 h-14 rounded-full "
                                        src={product?.prodID?.imageLinks}
                                    ></img>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {product?.prodID?.productName}
                                </td>
                                <td className="py-2 px-4 border-b">{product.paymentMethod}</td>
                                <td className="py-2 px-4 border-b">{product.orderStatus}</td>
                                <td className="py-2 px-4 border-b">{product.paymentStatus}</td>
                                <td className="py-2 px-4 border-b">{product.shippingCharge}</td>

                                <td className="py-2 px-4 border-b">{product.total}</td>
                                

                                <td className="py-2 px-4 border-b">
                                    {/* <button
                                        onClick={() => handleEdit(product)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                                    >
                                        Edit
                                    </button> */}
                                    {/* <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                                    >
                                        Delete
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                        </div>
                    </div>


                </div>


            </div>
        </div>
    );
};

export default Dashboard;