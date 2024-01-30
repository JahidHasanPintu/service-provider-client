import React, { useEffect, useState } from 'react';
// import useGeolocation from '../../hooks/useGeolocation ';
// import reqIcon from '../../assets/images/reqicon.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase.init';
import { toast } from 'react-toastify';

const Product = (props) => {
  const tutor = props.proposal;
//   const location = useGeolocation();
  const [user] = useAuthState(auth);
  const [distance, setDistance] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

//   useEffect(() => {
//     // Function to calculate the distance using the Haversine formula
//     const calculateDistance = () => {
//       if (location && location.latitude && location.longitude) {
//         const currentLatitude = location.latitude;
//         const currentLongitude = location.longitude;
//         const targetLatitude = tutor.location.latitude;
//         const targetLongitude = tutor.location.longitude;

//         const earthRadius = 6371; // Radius of the Earth in kilometers

//         const dLat = ((targetLatitude - currentLatitude) * Math.PI) / 180;
//         const dLon = ((targetLongitude - currentLongitude) * Math.PI) / 180;

//         const a =
//           Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//           Math.cos((currentLatitude * Math.PI) / 180) *
//           Math.cos((targetLatitude * Math.PI) / 180) *
//           Math.sin(dLon / 2) *
//           Math.sin(dLon / 2);

//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//         const distance = earthRadius * c; // Distance in kilometers

//         setDistance(distance);
//       }
//     };

//     calculateDistance();
//   }, [location, tutor]);

//   useEffect(() => {
//     if (user) {
//       setStudentEmail(user.email);
//       setStudentName(user.displayName);
//     }
//   }, [user]);


  const handleRequest = (event) => {

    const reqData = {
      studentName: studentName,
      studentEmail: studentEmail,
      techerEmail: tutor.email,
      proposal: tutor,
      timestamp: new Date(),
      status: "pending",



    }

    event.preventDefault();
    fetch(`http://localhost:5000/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.success("Successfully sent request")
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });

  }

  return (
    // <div className="bg-white rounded-lg overflow-hidden shadow-lg ring-1 ring-blue-400 ring-opacity-40 max-w-sm">
    //   <div className="relative">
    //     <img className="w-full" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product Image" />
    //     <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE</div>
    //   </div>
    //   <div className="p-4">
    //     <h3 className="text-lg font-medium mb-2">Product Title</h3>
    //     <p className="text-gray-600 text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ante vel eros fermentum faucibus sit amet euismod lorem.</p>
    //     <div className="flex items-center justify-between">
    //       <span className="font-bold text-lg">$19.99</span>
    //       <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Buy Now</button>
    //     </div>
    //   </div>
    // </div>
    <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <img className="h-48 w-full object-cover object-center" src="https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Product Image" />
      <div className="p-4">
        <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">Product Name</h2>
        <p className="mb-2 text-base dark:text-gray-300 text-gray-700">Product description goes here.</p>
        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">$20.00</p>
          <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">$25.00</p>
          <p className="ml-auto text-base font-medium text-green-500">20% off</p>
        </div>
      </div>
    </div>
  );
};

export default Product;