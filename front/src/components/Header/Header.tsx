import React, { FC, useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

import './Header.css';
import { Link } from 'react-scroll';
import logo from '../../images/logo.png';
import LangSwitch from '../LangSwitch/LangSwitch';

const Header: FC = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const handleMenuButton = () => setOpenMenu(!openMenu);
    const { t } = useTranslation();
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
            <LangSwitch/>
            <div className={'navigation'}>
                <ul className={openMenu ? 'menu_wrapper show_burger_menu' : 'menu_wrapper'}>
                    <Link
                        onClick={handleMenuButton}
                        className={'nav_link'}
                        to={'top'}
                        smooth={true} spy={false}
                        duration={800}
                        offset={-90}>{t('главная')}
                    </Link>
                    <Link
                        onClick={handleMenuButton}
                        className={'nav_link'}
                        to={'services'}
                        smooth={true} spy={false}
                        duration={800}
                        offset={-90}>{t('услуги')}
                    </Link>
                    <Link
                        onClick={handleMenuButton}
                        className={'nav_link'}
                        to={'barbers'}
                        smooth={true} spy={false}
                        duration={800}
                        offset={-90}>{t('барберы')}
                    </Link>
                    <Link
                        onClick={handleMenuButton}
                        className={'nav_link'}
                        to={'contacts'}
                        smooth={true} spy={false}
                        duration={800}
                        offset={-90}>{t('контакты')}
                    </Link>
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
