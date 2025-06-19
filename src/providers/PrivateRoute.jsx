import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
        return <div className='text-center'><span className="loading loading-bars loading-xl"></span></div>;
    }
    if(user && user?.email){
        return children;
    }else{
        return <Navigate to="/login" state={{ from: location }} replace />
    }
   
};

export default PrivateRoute;