import React, { useState } from 'react';
import Pagination from '../../../Shared/Pagination/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../../api/apiURL';
import Loading from '../../Loading/Loading';
import { toast } from 'react-toastify';
import { useUsers } from '../../../hooks/useUsers';
import axios from 'axios';

const Users = () => {
    const baseURL = getApiUrl();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");
    const [brand, setBrand] = useState("");
    const [limit, setLimit] = useState(10);
    const navigate = useNavigate();
    const [users, totalPages, loading, updateUsers] = useUsers(page, limit, search, role, brand);
    if (loading) {
        return <Loading />
    }

    // console.log(users);
    const handleDelete = async (userID) => {
        try {
            const response = await axios.delete(`${baseURL}/auth/delete/${userID}`);
            if (response.status === 200) {
                toast.success("user deleted successfully")
                console.log('user deleted successfully');
                updateUsers();
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEdit = (user) => {
        navigate(`/account/settings/${user._id}`, { state: { user } });
    }
    
    return (
        <div>
            {/* <Link to={"/account/add-products"}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 my-2 rounded">
                    Add New Product
                </button>
            </Link> */}

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">#</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Phone</th>
                            <th className="py-2 px-4 border-b">Address</th>
                            <th className="py-2 px-4 border-b">Role</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {users?.map((user, index) => (
                            <tr key={user._id}>
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>
                                <td className="py-2 px-4 border-b">{user.phone}</td>


                                <td className="py-2 px-4 border-b">{user.address}</td>
                                <td className="py-2 px-4 border-b">{user.role}</td>
                                <td className="py-2 px-4 border-b">
                                    {/* <button onClick={()=>handleEdit(user)} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2">
                                        Edit
                                    </button> */}
                                    <button onClick={()=>handleDelete(user._id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
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

export default Users;