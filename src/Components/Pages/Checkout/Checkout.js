import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getApiUrl } from '../../../api/apiURL';
import { useLocation, useNavigate } from 'react-router-dom';
import { CLEAR_CART } from '../../../redux/actions/action';

import { useBkash } from 'react-bkash';
import { useUserByEmail } from '../../../hooks/useUserByEmail';
import Select from 'react-select';
import { toast } from 'react-toastify';
import Loading from '../../Loading/Loading';
// import { useSelector } from 'react-redux';
const Checkout = () => {
    // const getData = useSelector((state) => state.authReducer);
    

    const location = useLocation();
    const { product } = location.state;
    const [userData] = useUserByEmail();
    const [email, setEmail] = useState(userData.email);
    const [contact, setContact] = useState(userData.phone);
    const [address, setAddress] = useState(userData.address);
    const [city, setCity] = useState(userData.city);
    const [postcode, setPostcode] = useState(userData.zipcode);
    const [notes, setNotes] = useState("");
    const [products, setProducts] = useState([]);
    const [division, setDivision] = useState([]);
    const [district, setDistrict] = useState([]);
    const [upzila, setUpzila] = useState([]);
    const [zipcode, setZipcode] = useState([]);


    const [subtotal, setSubtotal] = useState(product?.price);
    const [total, setTotal] = useState(0);
    const [shippingCharge, setShippingCharge] = useState(20);
    const [tax, setTax] = useState(0);
    const getData = useSelector((state) => state.cartReducer);
    const userInfo = useSelector((state) => state.authReducer);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [selectedDistricts, setSelectedDistricts] = useState(userData.city);
    const [selectedUpazilas, setSelectedUpazilas] = useState(null);
    const [selectedZipcodes, setSelectedZipcodes] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [discount, setDiscount] = useState(0);
    const user = userInfo.user.user;
    useEffect(() => {
        // Update the state of the form inputs with the values from the userData object
        setEmail(user.email);
        setContact(user.phone);
        setAddress(user.address);

    }, [user]);

    // address fetching start 
    useEffect(() => {
        const fetchDivisionData = async () => {
            try {
                const response = await axios.get('bd-divisions.json');
                const divisions = response.data.divisions;
                const existingDivision = divisions.find(
                    (division) => division.name === userData.division
                );

                if (existingDivision) {
                    const existingDiv = {
                        value: existingDivision.id,
                        label: existingDivision.name,
                    };
                    setSelectedDivision(existingDiv);
                }
                setDivision(divisions);
            } catch (error) {
                console.log('Error fetching division data:', error);
            }
        };

        fetchDivisionData();
    }, [userData.division]);

    const DivisionOptions = division.map((div) => ({
        value: div.id,
        label: div.name,
    }));

    const handleDivisionChange = (selectedDivision) => {
        setSelectedDivision(selectedDivision);
    };

    useEffect(() => {
        const fetchDistrictData = async () => {
            if (selectedDivision) {
                try {
                    const response = await axios.get('bd-districts.json');
                    const districts = response.data.districts;
                    const filteredData = districts.filter(
                        (district) => district.division_id === selectedDivision.value
                    );

                    const existingDis = filteredData.find(
                        (dis) => dis.name === userData.city
                    );

                    if (existingDis) {
                        const selectedDistrict = {
                            value: existingDis.id,
                            label: existingDis.name,
                        };
                        setSelectedDistricts(selectedDistrict);
                    }

                    setDistrict(filteredData);
                } catch (error) {
                    console.log('Error fetching district data:', error);
                }
            } else {
                setDistrict([]);
            }
        };

        fetchDistrictData();
    }, [selectedDivision, userData.city]);

    const districtsOptions = district.map((dis) => ({
        value: dis.id,
        label: dis.name,
    }));

    const handleDistrictChange = (selectedDistrict) => {
        setSelectedDistricts(selectedDistrict);
    };
    useEffect(() => {
        const fetchUpazilaData = async () => {
            if (selectedDistricts) {
                try {
                    const response = await axios.get('bd-upazilas.json');
                    const upazilas = response.data.upazilas;
                    const filteredData = upazilas.filter(
                        (upazila) => upazila.district_id === selectedDistricts.value
                    );

                    const existingUpazila = filteredData.find(
                        (upazila) => upazila.name === userData.upazila
                    );

                    if (existingUpazila) {
                        const selectedUpazila = {
                            value: existingUpazila.id,
                            label: existingUpazila.name,
                        };
                        setSelectedUpazilas(selectedUpazila);
                    }

                    setUpzila(filteredData);
                } catch (error) {
                    console.log('Error fetching upazila data:', error);
                }
            } else {
                setUpzila([]);
            }
        };

        fetchUpazilaData();
    }, [selectedDistricts, userData.upazila]);

    const UpazilasOptions = upzila.map((thana) => ({
        value: thana.id,
        label: thana.name,
    }));

    const handleUpazilaChange = (selectedUpazila) => {
        setSelectedUpazilas(selectedUpazila);
        console.log(selectedUpazila);
    };

    useEffect(() => {
        const existingZip = {
            value: '',
            label: userData.zipcode
        }
        setSelectedZipcodes(existingZip);
        const fetchZipcodeData = async () => {
            if (selectedUpazilas) {
                try {
                    const response = await axios.get('bd-postcodes.json');
                    const filteredData = response.data.postcodes.filter(
                        (postcode) => postcode.upazila === selectedUpazilas.label
                    );
                    setZipcode(filteredData);
                } catch (error) {
                    console.log('Error fetching zipcode data:', error);
                }
            } else {
                setZipcode([]);
            }

        };

        fetchZipcodeData();
    }, [selectedUpazilas, userData.zipcode]);

    const zipcodesOptions = zipcode.map((zip) => ({
        value: zip.postCode,
        label: zip.postCode,
    }));


    const handleZipcodeChange = (selectedZipcode) => {
        setSelectedZipcodes(selectedZipcode);
    };

    // addressing fetching end 

    const shippingAddress = {
        phone: contact,
        email: email,
        address: address,
        division: selectedDivision?.label,
        city: selectedDistricts?.label,
        upazila: selectedUpazilas?.label,
        zipcode: selectedZipcodes?.label

    }

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };


    const getSubtotal = (cart) => {
        return cart.reduce((total, item) => {
            return total + item.orderedPrice;
        }, 0);
    };

    useEffect(() => {
        setSubtotal(product?.price);

    }, [product]);

    useEffect(() => {
        // Convert variables to integers before addition
        const subtotalInt = parseInt(subtotal);
        const taxInt = parseInt(tax);
        const shippingChargeInt = parseInt(shippingCharge);
    
        // Perform addition
        const total = subtotalInt + taxInt + shippingChargeInt;
    
        // Set the total
        setTotal(total);
    
    }, [subtotal, shippingCharge, tax]);

    useEffect(() => {

        const extractedData = [];

        // Iterate over each item in getData.cart
        for (const item of getData.cart) {
            const { id, orderQuantity, orderColor, orderSize, price } = item;

            // Create an object with the extracted properties
            const extractedItem = {
                id,
                orderQuantity,
                orderColor,
                orderSize,
                price
            };

            // Add the extracted item to the array
            extractedData.push(extractedItem);
        }
        setProducts(extractedData);

        // console.log(extractedData);

    }, [])

    const orderData = {
        userID: user._id,
        prodID: product._id,
        shippingCharge: shippingCharge,
        subtotal: subtotal,
        total: total,
        shippingAddress: shippingAddress,
        notes: notes,
        paymentMethod: paymentMethod,
        paymentStatus: "unpaid",
    }

    const { error, loading, triggerBkash } = useBkash({
        onSuccess: (data) => {
            console.log(data); // this contains data from api response from onExecutePayment
        },
        onClose: () => {
            console.log('Bkash iFrame closed');
        },
        bkashScriptURL: 'https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js', // 
        amount: total,
        onCreatePayment: async (paymentRequest) => {
            // call your API with the payment request here
            // return await fetch('<your backend api>/create/', {
            // 	method: 'POST',
            // 	body: JSON.stringify(paymentRequest),
            // }).then((res) => res.json());

            return {
                paymentID: "2010726766625",
                amount: "2000",
                createTime: "",
                currency: "BDT",
                intent: "sale",
                transactionStatus: "Initiated",
                merchantInvoiceNumber: "bx547d6x",
                orgLogo: "Esheba",
                orgName: "E-Sheba"
            };

            // must return the following object:
            // {
            // 	paymentID: string;
            // 	createTime: string;
            // 	orgLogo: string;
            // 	orgName: string;
            // 	transactionStatus: string;
            // 	amount: string;
            // 	currency: string;
            // 	intent: string;
            // 	merchantInvoiceNumber: string;
            // }
        },
        onExecutePayment: async (paymentID) => {
            // call your executePayment API here
            // return await fetch('<your backend api>/execute/${paymentID}', {
            // 	method: 'POST',
            // }).then((res) => res.json());

            return {
                amount: "400",
                createTime: "",
                currency: "BDT",
                intent: "sale",
                transactionStatus: "COMPLETED",
                merchantInvoiceNumber: "",
                paymentID: "2010726766625",
                trxID: "uaidjyhajyhd777",
                updateTime: ""
            };

            // it doesn't matter what you return here, any errors thrown here will be available on error return value of the useBkash hook
        },
    });


    const prevShippingAddress = useRef(shippingAddress);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <h1>{error.message}</h1>;
    }


    const handlePlaceOrder = async () => {
        if (!paymentMethod) {
            toast.error("Select Payment Method");
        } else if (paymentMethod === 'cash_on_delivery') {
            try {
                const response = await axios.post(`${getApiUrl()}/orders/create`, orderData);
                // console.log(response.data);
                // dispatch(CLEAR_CART());
                navigate("/confirm", { state: { responseData: response.data } });
            } catch (error) {
                console.error(error);
            }

        } else if (paymentMethod === 'bkash_payment') {
            await triggerBkash(); // Wait for triggerBkash() to complete before proceeding

        } else {
            toast("Bank transfer currently unavailable");
        }

        // Rest of the code after placing the order
    };


    return (
        <div className="text-start  w-11/12 mx-auto  mt-5 mb-5 ">
            <div className="w-full  lg:flex lg:space-x-[30px]">
                <div className="lg:w-1/2 w-full">
                    <div className="bg-white p-4 shadow-md">
                        <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">Billing Details</h1>
                        <div className="form-area ">
                            <form>
                                <div className="flex space-x-5 items-center mb-4">
                                    <div className="w-1/2">
                                        <div className="input-com w-full h-full">
                                            <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                                                Email Address*
                                            </label>
                                            <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="example@mail.co"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none w-full h-[40px]" autocomplete="off" spellcheck="false" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="input-com w-full h-full">
                                            <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                                                Phone Number*
                                            </label>
                                            <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                                                <input
                                                    id="contact"
                                                    name="contact"
                                                    type="tel"
                                                    placeholder=""
                                                    value={contact}
                                                    onChange={(e) => setContact(e.target.value)}
                                                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none w-full h-[40px]" autocomplete="off" spellcheck="false" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" mb-4">
                                    <div className="w-full">
                                        <div className="input-com w-full h-full">
                                            <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">Address*</label>
                                            <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                                                <input id="address" name="address" type="text" placeholder="" value={address}
                                                    onChange={(e) => setAddress(e.target.value)} className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none w-full h-[40px]" autocomplete="off" spellcheck="false" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-5 items-center mb-4">
                                    <div className="w-1/2">
                                        <h1 className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal">Division*</h1>
                                        <div className="">
                                            <Select
                                                className="w-full h-full border-none bg-transparent focus:ring-0"
                                                options={DivisionOptions}
                                                onChange={handleDivisionChange}
                                                value={selectedDivision}

                                            />
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        <h1 className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal">District / City*</h1>
                                        <div className="">
                                            <Select
                                                className="w-full h-full border-none bg-transparent focus:ring-0"
                                                options={districtsOptions}
                                                onChange={handleDistrictChange}
                                                value={selectedDistricts}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="flex space-x-5 items-center mb-4">
                                    <div className="w-1/2">
                                        <h1 className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal"> Upzila / Town*</h1>
                                        <div className="">
                                            <Select
                                                className="w-full h-full border-none bg-transparent focus:ring-0"
                                                options={UpazilasOptions}
                                                onChange={handleUpazilaChange}
                                                value={selectedUpazilas}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        <h1 className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal">Postal / Zipcode*</h1>
                                        <div className="">
                                            <Select
                                                className="w-full h-full border-none bg-transparent focus:ring-0"
                                                options={zipcodesOptions}
                                                onChange={handleZipcodeChange}
                                                value={selectedZipcodes}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="relative flex items-center  ">
                                    <label className="group flex items-center text-heading text-sm cursor-pointer"><input type="checkbox" className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading checked:hover:bg-heading checked:focus:bg-heading" /><span className="ms-4 -mt-0.5 ml-2">Save this information for next time</span></label>
                                </div>
                                <div className="relative pt-3 xl:pt-6 mb-5">
                                    <label htmlFor="note" className="block text-gray-600 font-semibold text-sm leading-none mb-3">Order Notes (Optional)</label><textarea id="note" name="note" value={notes}
                                        onChange={(e) => setNotes(e.target.value)} className="px-4 py-3 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 bg-white border border-gray-300 focus:shadow focus:outline-none focus:border-heading placeholder-body" autocomplete="off" spellcheck="false" rows="4" placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
                                </div>



                            </form>
                        </div>
                    </div>

                    <div className='bg-white p-4 mt-5 shadow-md'>
                        <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">Total Items</h1>
                        <div className="sub-total mb-6">
                            <div className="flex justify-between mb-5">
                                <p className="text-[13px] font-medium text-qblack uppercase">PROduct</p>
                                <p className="text-[13px] font-medium text-qblack uppercase">Price</p>
                            </div>
                            <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                        </div>
                        <div className="product-list w-full mb-[30px]">
                            <ul className="flex flex-col space-y-5">
                                {/* {
                                        getData.cart?.map(product =>
                                        if product data is array and getting from cart page    

                                        )
                                    } */}
                                <li key={product._id}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="text-[15px] text-qblack mb-2.5">
                                                {product.productName}<sup className="text-[13px] text-qgray ml-2 mt-2">x1</sup>
                                            </h4>
                                            <p className="text-[13px] text-qgray">{product.brand}</p>
                                        </div>
                                        <div>
                                            <span className="text-[15px] text-qblack font-medium">${product.price}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="flex-1">
                    <div className="w-full bg-white p-4 shadow-md sticky top-[7rem]">
                        <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-3">Summary</h1>
                        <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                        <div className="mt-[10px]">
                            <div className="flex justify-between mb-2">
                                <p className="text-[13px] font-medium text-qblack uppercase">SUBTOTAL</p>
                                <p className="text-[15px] font-medium text-qblack uppercase">${subtotal}</p>
                            </div>
                        </div>
                        <div className="mt-[10px]">
                            <div className="flex justify-between mb-2">
                                <p className="text-[13px] font-medium text-qblack uppercase">shipping</p>
                                <p className="text-[15px] font-medium text-qblack uppercase">${shippingCharge}</p>
                            </div>
                        </div>
                        <div className="mt-[10px]">
                            <div className="flex justify-between mb-2">
                                <p className="text-[13px] font-medium text-qblack uppercase">Tax</p>
                                <p className="text-[15px] font-medium text-qblack uppercase">${tax}</p>
                            </div>
                            <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                        </div>

                        <div className="mt-[10px]">
                            <div className="flex justify-between mb-2">
                                <p className="text-2xl font-medium text-qblack">Total</p>
                                <p className="text-2xl font-medium text-qred">${total}</p>
                            </div>
                        </div>
                        <div className="shipping mt-[10px]">
                            <ul className="flex flex-col space-y-1">
                                <li className="mb-1">
                                    <div className="flex space-x-2.5 items-center">
                                        <div className="input-radio">
                                            <input
                                                type="radio"
                                                name="price"
                                                className="accent-pink-500"
                                                id="transfer"
                                                value="direct_bank_transfer"
                                                checked={paymentMethod === 'direct_bank_transfer'}
                                                onChange={handlePaymentMethodChange}
                                            />
                                        </div>
                                        <label htmlFor="transfer" className="text-[18px] text-normal text-qblack">
                                            Direct Bank Transfer
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex space-x-2.5 items-center mb-1">
                                        <div className="input-radio">
                                            <input
                                                type="radio"
                                                name="price"
                                                className="accent-pink-500"
                                                id="delivery"
                                                value="cash_on_delivery"
                                                checked={paymentMethod === 'cash_on_delivery'}
                                                onChange={handlePaymentMethodChange}
                                            />
                                        </div>
                                        <label htmlFor="delivery" className="text-[18px] text-normal text-qblack">
                                            Cash on Delivery
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex space-x-2.5 items-center mb-2">
                                        <div className="input-radio">
                                            <input
                                                type="radio"
                                                name="price"
                                                className="accent-pink-500"
                                                id="bank"
                                                value="bkash_payment"
                                                checked={paymentMethod === 'bkash_payment'}
                                                onChange={handlePaymentMethodChange}
                                            />
                                        </div>
                                        <label htmlFor="bank" className="text-[18px] text-normal text-qblack">
                                            Bkash Payment
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div onClick={handlePlaceOrder} className="w-full h-[50px] primary-bg-color flex justify-center items-center cursor-pointer hover:bg-yellow-500">
                            <span className="text-sm font-semibold">Place Order Now</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Checkout;