import React, { useState } from 'react';
import { useOrders } from '../../../hooks/useOrders';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("");
    const [userID, setUserId] = useState(32);
    const [limit, setLimit] = useState(100);

    const navigate = useNavigate();
    const navigateToInvoice = (order) => {
        
            navigate(`/account/invoice/${order.id}`, { state: { order: order } });
        


    };


    const [orders, totalPages, totalItem, loading] = useOrders(page, limit, sortBy, userID);
    if (loading) {
        return <Loading />
    }

    let pendingCount = 0;
    let deliveredCount = 0;
    let unpaidCount = 0;
    
    orders.forEach(order => {
        if (order.order_status === "pending") {
            pendingCount++;
        } else if (order.order_status === "delivered") {
            deliveredCount++;
        }

        if (order.payment_status === "unpaid") {
            unpaidCount++;
        }
    });

  
    return (
        <div>
            <div class="flex flex-col">

                <div class="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
                    <div class="shadow-lg bg-red-500 border-l-8 hover:bg-red-700 border-red-700 mb-2 p-2 md:w-1/4 mx-2">
                        <div class="p-4 flex flex-col">
                            <a href="#" class="no-underline text-white text-2xl">
                                {totalItem}
                            </a>
                            <a href="#" class="no-underline text-white text-lg">
                                Total Order
                            </a>
                        </div>
                    </div>

                    <div class="shadow bg-info border-l-8 hover:bg-info-700 border-info mb-2 p-2 md:w-1/4 mx-2">
                        <div class="p-4 flex flex-col">
                            <a href="#" class="no-underline text-white text-2xl">
                                {pendingCount}
                            </a>
                            <a href="#" class="no-underline text-white text-lg">
                                Total Bids
                            </a>
                        </div>
                    </div>

                    <div class="shadow bg-warning border-l-8 hover:bg-warning border-warning mb-2 p-2 md:w-1/4 mx-2">
                        <div class="p-4 flex flex-col">
                            <a href="#" class="no-underline text-white text-2xl">
                            {deliveredCount}
                            </a>
                            <a href="#" class="no-underline text-white text-lg">
                                Total Jobs
                            </a>
                        </div>
                    </div>

                    <div class="shadow bg-success border-l-8 hover:bg-success border-success mb-2 p-2 md:w-1/4 mx-2">
                        <div class="p-4 flex flex-col">
                            <a href="#" class="no-underline text-white text-2xl">
                            {unpaidCount}
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
                            <table class="table text-greyest w-full">
                                <thead class="bg-black ">
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 border-b">#</th>
                                        <th className="py-2 px-4 border-b">Order ID</th>
                                        <th className="py-2 px-4 border-b">Total</th>
                                        <th className="py-2 px-4 border-b">Payment Status</th>
                                        <th className="py-2 px-4 border-b">Trx ID</th>
                                        <th className="py-2 px-4 border-b">Delivery Status</th>
                                        <th className="py-2 px-4 border-b">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={order.id}>
                                            <td className="py-2 px-4 border-b">{index + 1}</td>
                                            <td className="py-2 px-4 border-b">{order.order_number}</td>
                                            <td className="py-2 px-4 border-b">{order.total}</td>
                                            <td className="py-2 px-4 border-b">{order.payment_status}</td>
                                            <td className="py-2 px-4 border-b">{order.transaction_id}</td>
                                            <td className="py-2 px-4 border-b">{order.order_status}</td>
                                            <td onClick={()=>navigateToInvoice(order)} className="py-2 px-4 border-b"><button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
                                                View
                                            </button></td>
                                        </tr>
                                    ))}
                                    {/* <tr>
                                        <th scope="row">1</th>
                                        <td>
                                            <button class="bg-blue-500 hover:bg-blue-800 text-white font-light py-1 px-2 rounded-full">
                                                Twitter
                                            </button>
                                        </td>
                                        <td>4500</td>
                                        <td>4600</td>
                                        <td>
                                            <span class="text-green-500"><i class="fas fa-arrow-up"></i>5%</span>
                                        </td>
                                    </tr> */}


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