import React, { useEffect, useState } from "react";
import { useOrders } from "../../../hooks/useOrders";
import Pagination from "../../../Shared/Pagination/Pagination";
import Loading from "../../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../../hooks/useProducts";
import axios from "axios";
import { toast } from "react-toastify";
import { getApiUrl } from "../../../api/apiURL";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setJobs(data.services));
  }, []);
  console.log("hello");
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

  const handleDelete = async (prodID) => {
    try {
      const response = await axios.delete(
        `${baseURL}/products/delete/${prodID}`
      );
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        console.log("Product deleted successfully");
        updateProducts();
      } else {
        console.error("Failed to delete product");
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
              <th className="py-2 px-4 border-b">Job Title</th>
              <th className="py-2 px-4 border-b">Budget</th>
              <th className="py-2 px-4 border-b">Duration</th>
              <th className="py-2 px-4 border-b">Experience</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {jobs?.map((product, index) => (
              <tr key={product._id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{product.TITLE}</td>
                <td className="py-2 px-4 border-b">{product.BUDGET}</td>
                <td className="py-2 px-4 border-b">{product.DURATION}</td>

                <td className="py-2 px-4 border-b">{product.EXPERIENCE}</td>
                <td className="py-2 px-4 border-b">{product.TYPE}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
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

export default AllJobs;
