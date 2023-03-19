import React from 'react';
import logo from '../MainAdmin/logo_admin.webp';
import { NavLink } from 'react-router-dom';
import { Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../../store/auth';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

const AdminHeader = () => {
    const { user } = useAppSelector(state => state.authStore);
    const dispatch = useAppDispatch();
    return (
        <div>
            <nav className={'navbar'}>
                <div>
                    <img src={logo} alt="logo"/>
                </div>
                <div className="navi">
                    <ul className="menu_wrap">
                        <li><NavLink className={'nav_link_admin'} to={'/admin/calendar'}>Календарь</NavLink></li>
                        <li><NavLink className={'nav_link_admin'} to={'/admin/schedule'}>Расписание</NavLink></li>
                        <li><NavLink className={'nav_link_admin'} to={'/admin/services'}>Услуги</NavLink></li>
                        <li><NavLink className={'nav_link_admin'} to={'/admin/prices'}>Цены</NavLink></li>
                        <li><NavLink className={'nav_link_admin'} to={'/admin/customers'}>Клиенты</NavLink></li>
                        <li><NavLink className={'nav_link_admin'} to={'/admin/barbers'}>Барберы</NavLink></li>
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
        </div>
    );
};

export default AdminHeader;