import React, { FC } from 'react';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';

import './Footer.css';
import logo from '../../images/logo.png';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
    const { t } = useTranslation();
    return (
        <div className={'footer'}>
            <div className={'footer_widget'}>
                <img className={'main_logo'} src={logo} alt="logo"/>
            </div>
            <div className={'footer_widget'}>
                <h5>{t('Адрес')}</h5>
                <p>{t('г. Бельцы, ул. Дечебал 142')}</p>
                <p><PhoneIphoneOutlinedIcon/>+37360233555</p>
            </div>
            <div className={'footer_widget'}>
                <h5>{t('График работы')}</h5>
                <p>{t('Пн-Сб: 8:00 - 18:00')} </p>
                <p>{t('Вс: 11:00 - 18:00')} </p>
            </div>
            <div className={'footer_widget'}>
                <h5>{t('он-лайн запись')}</h5>
                <button className={'button-5 bottom booking'}>{t('ЗАПИСАТЬСЯ')}</button>
            </div>
        </div>
    );
};

export default Footer;