import React, { FC, useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import './Header.css';
import { Link } from 'react-scroll';
import { menuItems } from './MenuItem';
import { IMenuItem } from './models/IMenuItem';
import logo from '../../images/logo.png';

const Header: FC = () => {

    const [openMenu, setOpenMenu] = useState(false);
    const handleMenuButton = () => setOpenMenu(!openMenu);

    return (
        <nav className={'navbar_items'} id={'menu'}>
            <h1>
                <img className={'main_logo'} src={logo} alt="logo"/>
            </h1>

            <div className={'instagram_icon'}>
                <a target="_blank" rel="noreferrer" href="front/src/components/Header/Header"
                   style={{ color: 'whitesmoke', textDecoration: 'none' }}>
                    <InstagramIcon fontSize={'large'}/>
                </a>
            </div>
            <div className={'navigation'}>
                <ul className={openMenu ? 'menu_wrapper show_burger_menu' : 'menu_wrapper'}>
                    {
                        menuItems.map((item: IMenuItem, index: number) => {
                            return (
                                <li>
                                    <Link
                                        onClick={handleMenuButton}
                                        className={item.cls} key={index}
                                        to={item.link}
                                        smooth={true} spy={false}
                                        duration={800}
                                        offset={!openMenu ? -77 : -90}>{item.title}
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            <div>
                <div className={'menu_icon'} onClick={handleMenuButton}>
                    <MenuIcon fontSize={'large'} style={{
                        display: !openMenu ? 'block' : 'none',
                        position: 'absolute',
                        top: 30,
                        right: 30
                    }}/>
                </div>
                <div className={'menu_icon'} onClick={handleMenuButton}>
                    <CloseIcon fontSize={'large'}
                               style={{
                                   display: openMenu ? 'block' : 'none',
                                   position: 'absolute',
                                   top: 30,
                                   right: 30
                               }}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Header;
