import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../../api/apiURL';
import Loading from '../../Loading/Loading';
import Bids from '../../Jobs/Bids';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useBkash } from 'react-bkash';

const BidsByJob = () => {
    const location = useLocation();
    const service = location.state.job;
    console.log(service);

    const baseURL = getApiUrl();
    const [bids, setBids] = useState([]);
    const [totalBids, setTotalBids] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
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

    }, [baseURL, service._id,toggle]);

    const handleDelete = async (bidId) => {
        try {
            const response = await axios.delete(
                `${baseURL}/bids/delete/${bidId}`
            );
            if (response.status === 200) {
                toast.success("Bid deleted successfully");
                console.log("Bid deleted successfully");
                setBids(prevBids => prevBids.filter(bid => bid._id !== bidId));
            } else {
                console.error("Failed to delete bid");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const navigate = useNavigate();

    const handleEdit = async (bidId) => {
        try {
            const updatedStatus = 'accepted';
            const response = await axios.put(`${baseURL}/bids/update/${bidId}`, { status: updatedStatus });

            if (response.status === 200) {
                console.log('Bid status updated successfully');
                toast.success("Bid status updated successfully");
                setToggle(true);

            } else {
                console.error('Failed to update bid status');
            }
        } catch (error) {
            console.error('Error updating bid status:', error);
        }
    };
    const { error, triggerBkash } = useBkash({
        onSuccess: (data) => {
            console.log(data); // this contains data from api response from onExecutePayment
        },
        onClose: () => {
            console.log('Bkash iFrame closed');
        },
        bkashScriptURL: 'https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js', // 
        amount: service?.BUDGET,
        onCreatePayment: async (paymentRequest) => {
            return {
                paymentID: "2010726766625",
                amount: "2000",
                createTime: "",
                currency: "BDT",
                intent: "sale",
                transactionStatus: "Initiated",
                merchantInvoiceNumber: "bx547d6x",
                orgLogo: "Esheba",
                orgName: "E-Sheba"
            };

           
        },
        onExecutePayment: async (paymentID) => {
           

            return {
                amount: "400",
                createTime: "",
                currency: "BDT",
                intent: "sale",
                transactionStatus: "COMPLETED",
                merchantInvoiceNumber: "",
                paymentID: "2010726766625",
                trxID: "uaidjyhajyhd777",
                updateTime: ""
            };

            // it doesn't matter what you return here, any errors thrown here will be available on error return value of the useBkash hook
        },
    });
    const handlePayment = async (bidId) => {
         triggerBkash();
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">#</th>
                            {/* <th className="py-2 px-4 border-b">Image</th> */}
                            <th className="py-2 px-4 border-b">Bider Name</th>
                            <th className="py-2 px-4 border-b">Details</th>
                            <th className="py-2 px-4 border-b">STATUS</th>
                            {/* <th className="py-2 px-4 border-b">Experience</th>
              <th className="py-2 px-4 border-b">Type</th> */}
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {bids?.map((bid, index) => (
                            <tr key={bid._id}>
                                <td className="py-2 px-4 border-b">{index + 1}</td>

                                <td className="py-2 px-4 border-b">{bid?.USER_ID?.name}</td>
                                <td className="py-2 px-4 border-b">{bid.DETAILS}</td>
                                <td className="py-2 px-4 border-b">{bid.STATUS}</td>


                                <td className="py-2 px-4 border-b">
                                    {
                                        bid.STATUS == "accepted"?<button
                                        onClick={() => handlePayment(bid._id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                                    >
                                        Pay Now
                                    </button>: <button
                                        onClick={() => handleEdit(bid._id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                                    >
                                        Accept
                                    </button>
                                    }
                                    
                                    <button
                                        onClick={() => handleDelete(bid._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* <Pagination page={page} totalPages={totalPages} setPage={setPage} /> */}
            </div>
        </div>
    );
};

export default BidsByJob;