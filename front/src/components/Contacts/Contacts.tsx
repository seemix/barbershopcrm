import React, { FC } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';

import './Contacts.css';
import { Card } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Contacts: FC = () => {
    const { t } = useTranslation();
    return (
        <div id={'contacts'} className={'services'}>
            <div className={'section_caption'}>
                <h3>LevelUP Barbershop</h3>
                <h2>{t('Контакты')}</h2>
                <div className={'heading_line'}></div>
                <div className={'cards_wrapper'}>
                    <Card className={'contact_form'}>
                        <div className={'time_wrapper'}>
                            <div><h3><LocationOnOutlinedIcon/></h3></div>
                            <div><h3>{t('Адрес')}</h3></div>
                        </div>
                        <h4>
                            {t('г. Бельцы, ул. Дечебал 142')}
                        </h4>
                        <div className={'time_wrapper'}>
                            <div><h3><PhoneIphoneOutlinedIcon/></h3></div>
                            <div><h3> {t('Телефон')} </h3></div>
                        </div>
                        <h4>
                            +37360233555
                        </h4>
                        <div className={'time_wrapper'}>
                            <div><h3><InstagramIcon/></h3></div>
                            <div><h3>Instagram</h3></div>
                        </div>
                        <h4>
                            <a target="_blank" rel="noreferrer"
                               href="https://www.instagram.com/lvlup_barbershop">@lvlup_barbershop</a>
                        </h4>
                        <div className={'time_wrapper'}>
                            <div><h3><EventAvailableOutlinedIcon/></h3></div>
                            <div><h3> {t('График работы')} </h3></div>

                        </div>
                        <h4>
                            {t('Пн-Сб: 8:00 - 18:00')} </h4>
                        <h4> {t('Вс: 11:00 - 18:00')}
                        </h4>
                    </Card>
                    <div className={'map'}>
                        {/*<iframe*/}
                        {/*    title="map"*/}
                        {/*    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2681.0986813230234!2d27.892893!3d47.7795345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cb5f7549b92381%3A0xc81f8e9f0ebaa132!2sLevel%20Up%20Barbershop!5e0!3m2!1sen!2s!4v1669068548349!5m2!1sen!2s"*/}
                        {/*    style={{ border: 0 }} loading="lazy"*/}
                        {/*    referrerPolicy="no-referrer-when-downgrade" width="100%" height="500">*/}
                        {/*</iframe>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;