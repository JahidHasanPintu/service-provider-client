import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../../firebase/firebase.init';
import axios from 'axios';
import { getApiUrl } from '../../../api/apiURL';


const Signup = () => {
    const baseURL = getApiUrl();
    const [passwordValid, setPasswordValid] = useState(true);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordValid(validatePassword(newPassword));
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    // const userData = {
    //     fullname: fullName,
    //     email: email,
    //     phone: phone,
    //     password: password,
    //     address: address,
    //     city: town,
    //     zipcode: zipCode,
    //     country: country,
    //     role: '2'

    // }


    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
   

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleInpuChange = (e) => {
        e.preventDefault();

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("working", email,password);

        try {
            const response = await axios.post(`${baseURL}/auth/register`, {
                email,
                name,
                password,
                phone,
                address
            });

            if (response.status === 201) {
                toast.success('Registration Successful');
                console.log(response.data);
                navigate(from, { replace: true });
                // You can perform a redirect or other actions here upon successful login.
            } else {
                toast.error('Register failed');
                console.log('Register failed');
            }
        } catch (error) {
            console.log('Register failed');
            console.error('Register error:', error);
        }
    };

    return (
        <div>
             <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
             <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
                 <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                     Register
                 </h2>
             </div>

             <div className="mt-10 shadow p-5 sm:mx-auto sm:w-full sm:max-w-sm">
                 <form onSubmit={handleSubmit} className="space-y-6 text-start" action="#" method="POST">
                     <div>
                         <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                             Full Name
                         </label>
                         <div className="mt-2">
                             <input
                                 id="name"
                                 name="name"
                                 type="name"
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}
                                 autoComplete="name"
                                 required
                                 className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                             />
                         </div>
                     </div>
                     <div>
                         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                             Email address
                         </label>
                         <div className="mt-2">
                             <input
                                 id="email"
                                 name="email"
                                 type="email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 autoComplete="email"
                                 required
                                 className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                             />
                         </div>
                     </div>
                     <div>
                         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                             Phone Number
                         </label>
                         <div className="mt-2">
                             <input
                                 id="phone"
                                 name="phone"
                                 type="phone"
                                 value={phone}
                                 onChange={(e) => setPhone(e.target.value)}
                                 autoComplete="phone"
                                 required
                                 className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                             />
                         </div>
                     </div>
                     <div>
                         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                             Address
                         </label>
                         <div className="mt-2">
                             <input
                                 id="address"
                                 name="address"
                                 type="text"
                                 autoComplete="address"
                                 value={address}
                                 onChange={(e) => setAddress(e.target.value)}
                                 required
                                 className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                             />
                         </div>
                     </div>

                     <div>
                         <div className="flex items-center justify-between">
                             <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                 Password
                             </label>

                         </div>
                         <div className="mt-2">
                             <input
                                 id="password"
                                 name="password"
                                 type="password"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 autoComplete="current-password"
                                 required
                                 className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                             />
                         </div>
                     </div>

                     <div>
                         <button
                             type="submit"
                             className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                         >
                             Register
                         </button>
                     </div>
                 </form>

                 <p className="mt-10 text-center text-sm text-gray-500">
                     Already a member?{' '}
                     <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                         Login
                     </Link>
                 </p>
             </div>
         </div>
        </div>
    );
};

export default Signup;