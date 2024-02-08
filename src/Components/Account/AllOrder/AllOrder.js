import React, { useEffect, useState } from "react";
import { useOrders } from "../../../hooks/useOrders";
import Pagination from "../../../Shared/Pagination/Pagination";
import Loading from "../../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../../hooks/useProducts";
import axios from "axios";
import { toast } from "react-toastify";
import { getApiUrl } from "../../../api/apiURL";
const AllOrder = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/orders")
            .then((res) => res.json())
            .then((data) => setOrders(data.orders));
    }, []);
    
    const baseURL = getApiUrl();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [limit, setLimit] = useState(10);
    const navigate = useNavigate();
    const [
        products,
        total,
        totalPages,
        productOnCurrentPage,
        loading,
        updateProducts,
    ] = useProducts(page, limit, search, category, brand);
    if (loading) {
        return <Loading />;
    }

    const handleDelete = async (orderID) => {
        try {
            const response = await axios.delete(
                `${baseURL}/orders/delete/${orderID}`
            );
            if (response.status === 200) {
                toast.success("Order deleted successfully");
                console.log("Order deleted successfully");
                setOrders(prevOrder => prevOrder.filter(order => order._id !== orderID));
            } else {
                console.error("Failed to delete order");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleEdit = (product) => {
        navigate(`/account/edit-product/${product._id}`, { state: { product } });
    };

    return (
        <div>
            <Link to={"/account/add-products"}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 my-2 rounded">
                    Add New Job
                </button>
            </Link>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Product Name</th>
                            <th className="py-2 px-4 border-b">paymentMethod</th>
                            <th className="py-2 px-4 border-b">orderStatus</th>
                            <th className="py-2 px-4 border-b">paymentStatus</th>
                            <th className="py-2 px-4 border-b">total</th>
                            <th className="py-2 px-4 border-b">Action</th>
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

                                <td className="py-2 px-4 border-b">{product.total}</td>
                                {/* <td className="py-2 px-4 border-b">{product.shippingCharge}</td> */}

                                <td className="py-2 px-4 border-b">
                                    {/* <button
                                        onClick={() => handleEdit(product)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                                    >
                                        Edit
                                    </button> */}
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                                    >
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

export default AllOrder;