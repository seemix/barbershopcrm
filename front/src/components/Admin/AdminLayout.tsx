import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { checkAuth } from '../../store/auth';

const AdminLayout = () => {
    const dispatch = useAppDispatch();
    let token;
    useEffect(() => {
        token = localStorage.getItem('token');
        if (token) {
            dispatch(checkAuth());
        }
    }, [dispatch]);
    const { auth, status } = useAppSelector(state => state.authStore);
    return (
        <>
            { auth ? <Outlet/> : <Navigate to={'/admin/login'}/>}
        </>
    );
};

export default AdminLayout;

//TODO make calendar page