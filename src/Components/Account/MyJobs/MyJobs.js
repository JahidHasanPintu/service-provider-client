import React, { useEffect, useState } from "react";
import { useOrders } from "../../../hooks/useOrders";
import Pagination from "../../../Shared/Pagination/Pagination";
import Loading from "../../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../../hooks/useProducts";
import axios from "axios";
import { toast } from "react-toastify";
import { getApiUrl } from "../../../api/apiURL";
import { useSelector } from "react-redux";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const getData = useSelector((state) => state.authReducer);
  const user = getData.user.user;
  useEffect(() => {
    const apiUrl = `http://localhost:5000/services/servicebyuser/${user._id}`;

    // Make the request using Axios
    axios.get(apiUrl)
      .then(response => {
        console.log(response.data);
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle errors here
      });
  }, [user]);
  //   useEffect(() => {

  //     fetch("http://localhost:5000/services")
  //       .then((res) => res.json())
  //       .then((data) => setJobs(data.services));
  //   }, []);
  console.log("hello");
  const baseURL = getApiUrl();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [limit, setLimit] = useState(50);
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

  const handleDelete = async (jobID) => {
    try {
      const response = await axios.delete(
        `${baseURL}/services/${jobID}`
      );
      if (response.status === 200) {
        toast.success("Service deleted successfully");
        console.log("Service deleted successfully");
        setJobs(prevJobs => prevJobs.filter(job => job._id !== jobID));
        // updateProducts();
      } else {
        console.error("Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (job) => {
    navigate(`/account/bids-by-jobs/${job._id}`, { state: { job } });
  };

  return (
    <div>
      <Link to={"/post-a-job"}>
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
            {jobs?.map((job, index) => (
              <tr key={job._id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{job.TITLE}</td>
                <td className="py-2 px-4 border-b">{job.BUDGET}</td>
                <td className="py-2 px-4 border-b">{job.DURATION}</td>

                <td className="py-2 px-4 border-b">{job.EXPERIENCE}</td>
                <td className="py-2 px-4 border-b">{job.TYPE}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(job)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
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

export default MyJobs;