import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { checkAuth } from '../../store/auth';
import Loader from '../Loader/Loader';

const AdminLayout = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
             dispatch(checkAuth());
        }
    }, [dispatch]);
    const { auth, status } = useAppSelector(state => state.authStore);
    return (
        <>
            {status === 'loading' && <Loader/>}
            {/*{status === 'error' && <Navigate to={'/admin/login'}/>}*/}
            {status === 'fulfilled' && auth ? <Outlet/> : !localStorage.getItem('token') &&
                <Navigate to={'/admin/login'}/>}
        </>
    );
};

export default AdminLayout;
