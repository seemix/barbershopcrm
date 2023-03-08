import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const auth = true;
    return (
        <>
            {auth ? <Outlet/> : <Navigate to={'/admin/login'}/>}
        </>
    );
};

export default AdminLayout;

//TODO make axios interceptors
//TODO make authSlices
//TODO make calendar page