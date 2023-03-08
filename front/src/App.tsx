import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import theme from './themes/theme';
import './App.css';
import Login from './components/Admin/Login/Login';
import MainAdmin from './components/Admin/MainAdmin';
const Layout = React.lazy(() => import('./components/Layout/Layout'));
const AdminLayout = React.lazy(() => import('./components/Admin/AdminLayout'));

const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route index element={<React.Suspense fallback={<>....fuck</>}>
                    <Layout/>
                </React.Suspense>}/>
                <Route path={'admin'} element={<React.Suspense fallback={<>...fuck</>}>
                    <AdminLayout/>
                </React.Suspense>}>
                    <Route path={''} element={<MainAdmin/>}/>
                </Route>
                <Route path={'admin/login'} element={<Login/>}/>
            </Routes>
        </ThemeProvider>
    );
};

export default App;