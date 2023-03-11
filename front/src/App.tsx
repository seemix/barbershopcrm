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

const Layout = React.lazy(() => import('./components/Layout/Layout'));
const AdminLayout = React.lazy(() => import('./components/Admin/AdminLayout'));

const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route index element={<React.Suspense fallback={<Loader/>}>
                    <Layout/>
                </React.Suspense>}/>
                <Route path={'admin'} element={<React.Suspense fallback={<Loader/>}>
                    <AdminLayout/>
                </React.Suspense>}>
                    <Route path={''} element={<MainAdmin/>}>
                        <Route path={'calendar'} element={<Calendar/>}/>
                        <Route path={'schedule'} element={<Schedule/>}/>
                        <Route path={'prices'} element={<Prices/>}/>
                    </Route>
                </Route>
                <Route path={'admin/login'} element={<Login/>}/>
                <Route path={'admin/register'} element={<Register/>}/>
            </Routes>
        </ThemeProvider>
    );
};

export default App;