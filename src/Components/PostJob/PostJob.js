import React, { useState } from 'react';
import { getApiUrl } from '../../api/apiURL';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const PostJob = () => {
    const baseURL = getApiUrl();
    const getData = useSelector((state) => state.authReducer);
    const user = getData.user.user;
    // console.log(user);
    const navigate = useNavigate();
    const API_URL = `${baseURL}/services/create`; // Replace with your API URL
    const [formData, setFormData] = useState({
        USER_ID: user._id,
        TITLE: '',
        BUDGET: '',
        DURATION: '',
        EXPERIENCE: '',
        TYPE: '',
        SKILLS: '',
        DESCRIPTION: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to your API with formData
            const response = await axios.post(API_URL, formData);
            toast.success("Service Posted successfully");
            console.log('Data successfully submitted:', response.data);
            // navigate("/admin")

        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error("failed !", error);
        }
    };

    return (
        <div class="card bg-white">
            <div class="card-body">
                <h2 className='mx-5 py-3 text-lg font-semibold'>Post a new service</h2>
                <div className="container mx-auto p-4">
                    <form
                        onSubmit={handleSubmit} 
                        className="max-w-md mx-auto grid col-2">

                        <div className="mb-4">
                            <input
                                type="text"
                                name="TITLE"
                                value={formData.TITLE}
                                onChange={handleChange}
                                placeholder="Add title for your work"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="BUDGET"
                                value={formData.BUDGET}
                                onChange={handleChange}
                                placeholder="$ Budget"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="DURATION"
                                value={formData.DURATION}
                                onChange={handleChange}
                                placeholder="Duration (eg: 2 Days)"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="number"
                                name="EXPERIENCE"
                                value={formData.EXPERIENCE}
                                onChange={handleChange}
                                placeholder="Experience"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="TYPE"
                                value={formData.TYPE}
                                onChange={handleChange}
                                placeholder="Type (e.g., Plumber, Maid etc)"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="SKILLS"
                                value={formData.SKILLS}
                                onChange={handleChange}
                                placeholder="Skills (e.g., Plumbing, Electrician)"
                                className="w-full p-2 border rounded"
                            />
                        </div>


                        <div className="mb-4">
                            <textarea
                                type="text"
                                name="DESCRIPTION"
                                value={formData.DESCRIPTION}
                                onChange={handleChange}
                                placeholder="Description"
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <button type='submit' className="mb-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">Save</button>
                    </form>
                </div>




            </div>
        </div>

    );
};

export default PostJob;