import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../../api/apiURL';
import Loading from '../../Loading/Loading';
import Bids from '../../Jobs/Bids';
import { toast } from 'react-toastify';
import axios from 'axios';

const BidsByJob = () => {
    const location = useLocation();
    const service = location.state.job;
    console.log(service);

    const baseURL = getApiUrl();
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

    const handleDelete = async (jobID) => {
        try {
            const response = await axios.delete(
                `${baseURL}/services/${jobID}`
            );
            if (response.status === 200) {
                toast.success("Service deleted successfully");
                console.log("Service deleted successfully");
                // setJobs(prevJobs => prevJobs.filter(job => job._id !== jobID));
                // updateProducts();
            } else {
                console.error("Failed to delete service");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const navigate = useNavigate();

    const handleEdit = (job) => {
        navigate(`/account/bids-by-jobs/${job._id}`, { state: { job } });
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
                                    <button
                                        onClick={() => handleEdit(bid)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                                    >
                                        Accept
                                    </button>
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