import React, { useState } from 'react';
import { getApiUrl } from '../../../api/apiURL';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProduct = () => {
    const baseURL = getApiUrl();
    const getData = useSelector((state) => state.authReducer);
    const user = getData.user.user;
    // console.log(user);
    const navigate = useNavigate();
    const location = useLocation();
    const { product } = location.state;
    const API_URL = `${baseURL}/products/update/${product._id}`; // Replace with your API URL
    const [formData, setFormData] = useState({
        USER_ID: user._id,
        productName: product.productName,
        price: product.price,
        quantity: product.quantity,
        imageLinks: product.imageLinks,
        category: product.category,
        brand: product.brand,
        description: product.description,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(API_URL, formData); 
            toast.success("Product updated successfully");
            console.log('Data successfully updated:', response.data);
            navigate("/account/products");
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error("Update failed!", error.message);
        }
    };
    return (
        <div>
            <div class="card bg-white">
                <div class="card-body">
                    <h2 className='mx-5 py-3 text-lg font-semibold'>Update product</h2>
                    <div className="container mx-auto p-4">
                        <form
                            onSubmit={handleSubmit}
                            className="max-w-md mx-auto grid col-2">

                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    placeholder="Product Name"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className='flex'>
                            <div className="mb-4 mr-6">
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="$ price"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    placeholder="quantity (eg: 2)"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="imageLinks"
                                    value={formData.imageLinks}
                                    onChange={handleChange}
                                    placeholder="Paste image Links"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="category (e.g., electric, gadget etc)"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    placeholder="brand (e.g., Walton, Samsung)"
                                    className="w-full p-2 border rounded"
                                />
                            </div>


                            <div className="mb-4">
                                <textarea
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="description of your product"
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <button type='submit' className="mb-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">Save</button>
                        </form>
                    </div>




                </div>
            </div>
        </div>
    );
};

export default EditProduct;