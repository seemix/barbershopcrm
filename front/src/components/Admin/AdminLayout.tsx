import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';

const AdminLayout = () => {
    const { auth } = useAppSelector(state => state.authStore);
    return (
        <>
            {auth ? <Outlet/> : <Navigate to={'/admin/login'}/>}
        </>
    );
};

export default AdminLayout;

//TODO make calendar page