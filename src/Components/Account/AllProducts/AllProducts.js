import React, { useState } from 'react';
import { useOrders } from '../../../hooks/useOrders';
import Pagination from '../../../Shared/Pagination/Pagination';
import Loading from '../../Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../../../hooks/useProducts';
const AllProducts = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [limit, setLimit] = useState(10);
    const [products, total,totalPages,loading] = useProducts(page, limit, search, category,brand);
    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <Link to={"/account/add-products"}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 my-2 rounded">
                Add New Product
            </button>
            </Link>
            
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Product Name</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Brand</th>
                            <th className="py-2 px-4 border-b">Quantity</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {products?.map((product, index) => (
                            <tr key={product._id}>
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{product.productName}</td>
                                <td className="py-2 px-4 border-b">{product.category}</td>
                                <td className="py-2 px-4 border-b">{product.brand}</td>
                                
                                
                                <td className="py-2 px-4 border-b">{product.quantity}</td>
                                <td className="py-2 px-4 border-b">{product.price}</td>
                                <td className="py-2 px-4 border-b"><button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
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

export default AllProducts;