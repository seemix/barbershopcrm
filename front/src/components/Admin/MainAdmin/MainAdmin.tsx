import React from 'react';

import './MainAdmin.css';

import { Outlet } from 'react-router-dom';
import AdminHeader from '../AdminHeader/AdminHeader';

const MainAdmin = () => {
    return (
        <>
            <AdminHeader/>
            <Outlet/>
        </>
    );
};
export default MainAdmin;