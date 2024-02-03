import React, { useEffect, useState } from 'react';
import Pagination from '../../../Shared/Pagination/Pagination';
import { getApiUrl } from '../../../api/apiURL';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import { toast } from 'react-toastify';
import axios from 'axios';

const AllBids = () => {
    const baseURL = getApiUrl();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [bids, setBids] = useState([]);
    const [brand, setBrand] = useState("");
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const getBids = async () => {
          setLoading(true);
          try {
            const response = await axios.get(`${baseURL}/bids/all-bids`, {
              params: {
                page,
                limit,
              },
            });
    
            const { success, bids, totalPages } = response.data;
    
            if (success) {
              setBids(bids);
              setTotalPages(totalPages);
              console.log(bids);
            } else {
              console.error("Error fetching data");
            }
          } catch (error) {
            console.error("Error fetching data", error);
          }
          setLoading(false);
        };
        getBids();
      }, [page, limit]);
    
    if (loading) {
        return <Loading />
    }

    const handleDelete = async (prodID) => {
        try {
            const response = await axios.delete(`${baseURL}/products/delete/${prodID}`);
            if (response.status === 200) {
                toast.success("Product deleted successfully")
                console.log('Product deleted successfully');
                // updateProducts();
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit = (product) => {
        navigate(`/account/edit-product/${product._id}`, { state: { product } });
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Bider Name</th>
                            <th className="py-2 px-4 border-b">Job Title</th>
                            <th className="py-2 px-4 border-b">Details</th>
                            {/* <th className="py-2 px-4 border-b">Quantity</th>
                            <th className="py-2 px-4 border-b">Price</th> */}
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {bids?.map((bid, index) => (
                            <tr key={bid._id}>
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{bid.bidName}</td>
                                <td className="py-2 px-4 border-b">{bid.category}</td>
                                <td className="py-2 px-4 border-b">{bid.brand}</td>


                                <td className="py-2 px-4 border-b">{bid.quantity}</td>
                                <td className="py-2 px-4 border-b">{bid.price}</td>
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

                <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            </div>

        </div>
    );
};

export default AllBids;