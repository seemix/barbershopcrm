import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { checkAuth } from '../../store/auth';
import Loader from '../Loader/Loader';

const AdminLayout = () => {
    const { auth, status } = useAppSelector(state => state.authStore);

    const dispatch = useAppDispatch();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
             dispatch(checkAuth());
        }
    }, []);
    return (
        <>
            {status === 'loading' && <Loader/>}
            {/*{status === 'error' && <Navigate to={'/admin/login'}/>}*/}
            {/*{status === 'fulfilled' && auth ? <Outlet/> : <Navigate to={'/admin/login'}/>}*/}
            {status === 'fulfilled' && auth ? <Outlet/> : null}
            {!auth ? <Navigate to={'/admin/login'}/> : null}
        </>
    );
};

export default AdminLayout;
