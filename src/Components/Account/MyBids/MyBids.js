import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getApiUrl } from '../../../api/apiURL';

const MyBids = () => {
    const baseURL = getApiUrl();
    const [bids, setBids] = useState([]);
    const getData = useSelector((state) => state.authReducer);
    const user = getData.user.user;
    useEffect(() => {
        const apiUrl = `http://localhost:5000/bids/bidsbyuser/${user._id}`;
    
        // Make the request using Axios
        axios.get(apiUrl)
          .then(response => {
            console.log(response.data);
            setBids(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            // Handle errors here
          });
      }, [user]); 

      const handleDelete = async (prodID) => {
        try {
            const response = await axios.delete(`${baseURL}/bids/delete/${prodID}`);
            if (response.status === 200) {
                toast.success("Bids deleted successfully")
                console.log('Bids deleted successfully');
                // updateProducts();
            } else {
                console.error('Failed to delete Bid');
            }
        } catch (error) {
            console.error('Error deleting Bid:', error);
        }
    };

    const handleEdit = (product) => {
        console.log("Editing bid");
        // navigate(`/account/edit-product/${product._id}`, { state: { product } });
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Job Title</th>
                            <th className="py-2 px-4 border-b">Bider Name</th>
                            
                            <th className="py-2 px-4 border-b">Status</th>
                            {/* <th className="py-2 px-4 border-b">Quantity</th>
                            <th className="py-2 px-4 border-b">Price</th> */}
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {bids?.map((bid, index) => (
                            <tr key={bid._id}>
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                {/* <td className="py-2 px-4 border-b">{bid._id}</td> */}
                                <td className="py-2 px-4 border-b">{bid?.DETAILS}</td>
                                <td className="py-2 px-4 border-b">{bid.STATUS}</td>
                                <td className="py-2 px-4 border-b">{bid.STATUS}</td>
                                {/* <td className="py-2 px-4 border-b">{bid.DETAILS}</td> */}
                                {/* <td className="py-2 px-4 border-b">{bid.brand}</td> */}


                                {/* <td className="py-2 px-4 border-b">{bid.quantity}</td>
                                <td className="py-2 px-4 border-b">{bid.price}</td> */}
                                <td className="py-2 px-4 border-b">
                                    <button onClick={()=>handleEdit(bid)} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2">
                                        Edit
                                    </button>
                                    <button onClick={()=>handleDelete(bid._id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
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

export default MyBids;