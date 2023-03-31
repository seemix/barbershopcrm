import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import theme from './themes/theme';
import './App.css';
import Login from './components/Admin/Login/Login';
import MainAdmin from './components/Admin/MainAdmin/MainAdmin';
import Loader from './components/Loader/Loader';
import Schedule from './components/Admin/Schedule/Schedule';
import Calendar from './components/Admin/Calendar/Calendar';
import Prices from './components/Admin/Prices/Prices';
import Register from './components/Admin/Register/Register';
import Customers from './components/Admin/Customers/Customers';
import Barbers from './components/Admin/Barbers/Barbers';
import ServicesWrapper from './components/Admin/Services/ServicesWrapper';

const Layout = React.lazy(() => import('./components/Layout/Layout'));
const AdminLayout = React.lazy(() => import('./components/Admin/AdminLayout'));

const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route index element={<React.Suspense fallback={<Loader/>}>
                    <Layout/>
                </React.Suspense>}/>
                <Route element={<React.Suspense fallback={<Loader/>}>
                    <AdminLayout/>
                </React.Suspense>}>
                    <Route path={'admin'} element={<MainAdmin/>}>
                        <Route path={'calendar'} element={<Calendar/>}/>
                        <Route path={'schedule'} element={<Schedule/>}/>
                        <Route path={'services'} element={<ServicesWrapper/>}/>
                        <Route path={'prices'} element={<Prices/>}/>
                        <Route path={'customers'} element={<Customers/>}/>
                        <Route path={'barbers'} element={<Barbers/>}/>
                    </Route>
                </Route>
                <Route path={'admin/login'} element={<Login/>}/>
                <Route path={'admin/register'} element={<Register/>}/>
            </Routes>
        </ThemeProvider>
    );
};

export default App;