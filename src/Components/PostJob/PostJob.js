import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../../api/apiURL';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Select from 'react-select';

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
        LOCATION: '',
        DESCRIPTION: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [district, setDistrict] = useState([]);
    const [selectedDistricts, setSelectedDistricts] = useState();

    useEffect(() => {
        const fetchDistrictData = async () => {

            try {
                const response = await axios.get('bd-districts.json');
                const districts = response.data.districts;
                setDistrict(districts);
            } catch (error) {
                console.log('Error fetching district data:', error);
            }

        };

        fetchDistrictData();
    }, []);

    const districtsOptions = district.map((dis) => ({
        value: dis.id,
        label: dis.name,
    }));

    const handleDistrictChange = (selectedOption) => {
        setFormData({ ...formData, LOCATION: selectedOption.label });
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

    const categories = [
        {
            "id": "1",
            "cat_name": "Painting Service",
            "cat_image": "https://www.svgrepo.com//show/99774/paint-brush.svg",

        },
        {
            "id": "2",
            "cat_name": "Electrician/ Electric Service",
            "cat_image": "https://static.vecteezy.com/system/resources/previews/004/273/535/non_2x/electric-plug-socket-icon-symbol-design-free-vector.jpg",

        },
        {
            "id": "3",
            "cat_name": "Plumbing & Sanitary Service",
            "cat_image": "https://cdn-icons-png.flaticon.com/512/4635/4635163.png",

        },
        {
            "id": "4",
            "cat_name": "Home Cleaning",
            "cat_image": "https://cdn-icons-png.flaticon.com/512/2737/2737066.png",

        },
        {
            "id": "5",
            "cat_name": "Pest Control",
            "cat_image": "https://cdn-icons-png.flaticon.com/512/4295/4295647.png",

        },
        {
            "id": "6",
            "cat_name": "Garden Clening",
            "cat_image": "https://cdn-icons-png.flaticon.com/512/2737/2737066.png",

        },
        {
            "id": "7",
            "cat_name": "House Shifting",
            "cat_image": "https://cdn-icons-png.flaticon.com/512/5487/5487334.png",

        },
        {
            "id": "8",
            "cat_name": "Baby Sitter Service",
            "cat_image": "https://cdn-icons-png.flaticon.com/512/4660/4660683.png",

        },
    ];

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
                                placeholder="৳ Budget"
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
                            <select
                                name="TYPE"
                                value={formData.TYPE}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            >
                               <option value="" disabled>Select a type</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.cat_name}>
                                        {category.cat_name}
                                    </option>
                                ))}
                            </select>
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
                            <Select
                                className="w-full p-2 border rounded"
                                options={districtsOptions}
                                onChange={handleDistrictChange} // Use the new handler here
                                // To set the value, you need to find the corresponding option object
                                value={districtsOptions.find(option => option.label === formData.LOCATION)}
                                name="LOCATION"
                            />
                            {/* <input
                                type="text"
                                name="LOCATION"
                                value={formData.LOCATION}
                                onChange={handleChange}
                                placeholder="Area (e.g., Dhaka)"
                                className="w-full p-2 border rounded"
                            /> */}
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