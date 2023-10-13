import React, { useEffect, useState } from 'react';
import { useOrders } from '../../../hooks/useOrders';
import Pagination from '../../../Shared/Pagination/Pagination';
import Loading from '../../Loading/Loading';
import InvoiceModal from './InvoiceModal';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("");
    const [userID, setUserId] = useState(32);
    const [limit, setLimit] = useState(10);
    const navigate = useNavigate();
    const navigateToInvoice = (order) => {

        navigate(`/account/invoice/${order.id}`, { state: { order: order } });



    };



    const [orders, totalPages, totalItem, loading] = useOrders(page, limit, sortBy, userID);
    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
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
                    <tbody className='text-center'>
                        {orders.map((order, index) => (
                            <tr key={order.id}>
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{order.order_number}</td>
                                <td className="py-2 px-4 border-b">{order.total}</td>
                                <td className="py-2 px-4 border-b">{order.payment_status}</td>
                                <td className="py-2 px-4 border-b">{order.transaction_id}</td>
                                <td className="py-2 px-4 border-b">{order.order_status}</td>
                                <td onClick={() => navigateToInvoice(order)} className="py-2 px-4 border-b"><button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
                                    View
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            </div>
        </div>
    );
};

export default MyOrders;