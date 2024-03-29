import React, { FC, useEffect, useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

import './Header.css';
import { Link } from 'react-scroll';
import logo from '../../images/logo.png';
import LangSwitch from '../LangSwitch/LangSwitch';
import { useOutsideClick } from '../../hooks/outside-click';

const Header: FC = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) setScroll(true);
            else setScroll(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleMenuButton = () => setOpenMenu(!openMenu);
    const closeMenu = () => {
        setOpenMenu(false);
    };
    const menuRef: React.MutableRefObject<any> = useOutsideClick(closeMenu);
    const { t } = useTranslation();

    return (
        <nav className={scroll ? 'navbar_items navbar_scroll' : 'navbar_items'} id={'menu'}>
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
                <ul className={openMenu ? 'menu_wrapper show_burger_menu' : 'menu_wrapper'} ref={menuRef}>
                    {[
                        { to: 'top', label: t('главная') },
                        { to: 'services', label: t('услуги') },
                        { to: 'barbers', label: t('барберы') },
                        { to: 'contacts', label: t('контакты') },
                    ].map(({ to, label }) => (
                        <Link
                            key={to}
                            onClick={handleMenuButton}
                            className={`nav_link ${scroll ? '' : 'nav_link_scroll'}`}
                            to={to}
                            smooth={true}
                            spy={false}
                            duration={700}
                            offset={-80}
                        >
                            {label}
                        </Link>
                    ))}
                </ul>
            </div>
            <div>
                <div className={'menu_icon'} onClick={handleMenuButton}>
                    <MenuIcon fontSize={'large'} style={{
                        display: !openMenu ? 'block' : 'none'
                    }}/>
                </div>
                <div className={'menu_icon'} onClick={() => setOpenMenu(false)}>
                    <CloseIcon fontSize={'large'}
                               style={{ display: openMenu ? 'block' : 'none' }}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Header;
