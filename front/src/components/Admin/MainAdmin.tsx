import React from 'react';
import Button from '@mui/material/Button';
import '../../components/Header/Header.css'

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/auth';

const MainAdmin = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.authStore);
    return (
        <div>
            <nav className={'navbar_items'}>
                <div className="navigation">
                    Календарь Расписание Услуги
                </div>
            </nav>
            <h2>MAIN admin</h2>
            <h4>{user.email}</h4><Button onClick={() => dispatch(logout())}>Logout</Button>
            {user.role === '2995' && <h3>UUUUUSSSEER</h3>}
        </div>
    );
};

export default MainAdmin;