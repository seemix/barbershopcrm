import React from 'react';

import '../../../components/Header/Header.css';
import './MainAdmin.css';

import { NavLink, Outlet } from 'react-router-dom';
import logo from '../../../images/logo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Avatar } from '@mui/material';
import { logout } from '../../../store/auth';

const MainAdmin = () => {
    const { user } = useAppSelector(state => state.authStore);
    const dispatch = useAppDispatch();
    return (
        <div>
            <nav className={'navbar_items'}>
                <h1>
                    <img className={'main_logo'} src={logo} alt="logo"/>
                </h1>
                <div className="navigation">
                    <ul className="menu_wrapper">
                        <li><NavLink className={'nav_link'} to={'/admin/calendar'}>Календарь</NavLink></li>
                        <li><NavLink className={'nav_link'} to={'/admin/schedule'}>Расписание</NavLink></li>
                        <li><NavLink className={'nav_link'} to={'/admin/prices'}>Цены</NavLink></li>
                        {/*<li><NavLink className={'nav_link'} to={'/'}>Услуги</NavLink></li>*/}
                    </ul>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                    <Avatar style={{ backgroundColor: '#9e8a78' }}>
                        {user?.name[0]}
                    </Avatar>
                    <span style={{ color: '#ddd' }}><small>Welcome, {user.name}</small></span>
                    <span><LogoutIcon style={{ color: '#ddd', marginTop: '5px', cursor: 'pointer' }}
                                      onClick={() => dispatch(logout())}/></span>
                </div>
            </nav>
            <Outlet/>
        </div>
    );
};

export default MainAdmin;