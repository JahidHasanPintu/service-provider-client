import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { auth } from '../../firebase/firebase.init';
import { useSelector } from 'react-redux';


const RequireAuth = ({children}) => {
    // const [user,loading] = useAuthState(auth);
    
    const getData = useSelector((state) => state.authReducer);
    const user = getData.user;
    console.log(user);
    const location = useLocation();
    // if(loading){
    //     return <Loading></Loading>
    // }
    if(!user){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;