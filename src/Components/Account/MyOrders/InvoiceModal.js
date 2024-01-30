import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../../../api/apiURL';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const InvoiceModal = () => {
    const location = useLocation();
    const order = location.state.order;
    const baseUrl = getApiUrl();
    const [products, setProducts] = useState(null);
    const orderID = order.id;
    const [comments, setComments] = useState("");
    // const [orderStatus, setOrderStatus] = useState(order.order_status || "");
    console.log(order);

    const OrderCreationTime = () => {
        const orderCreatedAt = order.created_at;
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        const formattedDate = new Date(orderCreatedAt).toLocaleString('en-US', options);

        return formattedDate;
    };

    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`${baseUrl}/orders/${orderID}`);
                setOrderDetails(response.data.data);
                setProducts(response.data.data.items);
                // setPaymentStatus(response.data.data.payment_details.payment_status);

                // Set the default value for comments if it exists in oderDetails
                if (response.data.data.comments) {
                    setComments(response.data.data.comments);
                }

            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchOrderDetails();
    }, [baseUrl, orderID]);






    return (
        <div class="card bg-white">
            <div class="card-body">
                <div class="container-fluid flex justify-between">
                    <div class="col-lg-3 ps-0 text-start">
                        <a href="#" class="noble-ui-logo block mt-3">Dutta<span>Hardware</span></a>
                        <p class="mt-1 mb-1"><b>Hardware Marketplace</b></p>
                        <p>108,<br />Dutta Street,<br />Rajbari, Dhaka Division BD.</p>
                        <h5 class="mt-5 mb-2 text-muted">Invoice to :</h5>
                        <p>{orderDetails?.user_info.fullname}<br />{orderDetails?.user_info.phone},<br />{orderDetails?.user_info.email}</p>
                    </div>
                    <div class="col-lg-3 pe-0">
                        <h4 class="font-bold text-uppercase text-end mt-4 mb-2">invoice</h4>
                        <h6 class="text-end mb-5 pb-4">#{orderDetails?.order_number}</h6>
                        <p class="text-end mb-1">Total Amount</p>
                        <h4 class="text-end font-normal">৳ {orderDetails?.payment_details.total}</h4>
                        <p class="text-end mb-1">Status</p>
                        <h4 class="text-end font-normal">{orderDetails?.payment_details.payment_status}</h4>
                        <h6 class="mb-0 mt-3 text-end font-normal mb-2"><span class="text-muted"> Date :</span> {OrderCreationTime()}</h6>
                    </div>
                </div>
                <div class="container-fluid mt-5 flex justify-center w-100">
                    <div class="table-responsive w-full">
                        <table class="table border w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th class="text-end">Quantity</th>
                                    <th class="text-end">Unit cost</th>
                                    <th class="text-end">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products?.map((product, index) =>

                                        <tr key={product.product_id} className="text-end">
                                            <td className="text-start">{index + 1}</td>
                                            <td className="text-start"><img src={product?.image_url} className='me-4' style={{ width: '50px', height: '50px' }} alt='' /></td>
                                            <td className="text-start">{product?.product_name}</td>
                                            <td className="text-start">{product?.color ? product.color : 'N/A'}</td>
                                            <td className="text-start">{product?.size ? product.size : 'N/A'}</td>
                                            <td> {product?.quantity}</td>
                                            <td>৳{product?.price}</td>
                                            <td>৳{product?.price * product?.quantity}</td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="container-fluid mt-5 w-full">
                    <div class="flex justify-end">
                        <div class="col-md-6 ms-auto">
                            <div class="table-responsive">
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td class="text-start">Sub Total</td>
                                            <td class="text-end">৳ {orderDetails?.payment_details.subtotal}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-start">Shipping</td>
                                            <td class="text-end">৳ {orderDetails?.payment_details.shipping} </td>
                                        </tr>
                                        <tr>
                                            <td class="text-start">Discount</td>
                                            <td class="text-danger text-end">(-) ৳ {orderDetails?.payment_details.discount}</td>
                                        </tr>
                                        <tr class="bg-gray-100">
                                            <td class="font-bold text-start">Total</td>
                                            <td class="font-bold text-end">৳ {orderDetails?.payment_details.total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div class="container-fluid w-full">

                    <button onClick={generatePDF} class="btn btn-outline-primary float-end mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-printer me-2 icon-md">
                            <polyline points="6 9 6 2 18 2 18 9"></polyline>
                            <path
                                d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                            <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>Download
                    </button>
                </div> */}
            </div>
        </div>



    );
};

export default InvoiceModal;