import React, { FC } from 'react';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';

import './Footer.css';
import logo from '../../images/logo.png';

const Footer: FC = () => {
    return (
        <div className={'footer'}>
            <div className={'footer_widget'}>
                <img className={'main_logo'} src={logo} alt="logo"/>
            </div>
            <div className={'footer_widget'}>
                <h5>Адрес</h5>
                <p>г. Бельцы, ул. Дечебал 142</p>
                <p><PhoneIphoneOutlinedIcon/>+37360233555</p>
            </div>
            <div className={'footer_widget'}>
                <h5>График работы</h5>
                <p>Пн-Сб: 8:00 - 18:00 </p>
                <p>ВС: выходной </p>
            </div>
            <div className={'footer_widget'}>
                <h5>Он-лайн запись</h5>
                <button className={'button-5 bottom booking'}>ЗАПИСАТЬСЯ</button>
            </div>
        </div>
    );
};

export default Footer;