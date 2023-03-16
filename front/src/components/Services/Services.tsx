import React, { FC } from 'react';
import { Card } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from 'react-i18next';

import './Services.css';

const Services: FC = () => {
    const { t } = useTranslation();
    return (
        <div className={'services'} id={'services'}>
            <div className={'section_caption'}>
                <h3>LevelUP Barbershop</h3>
                <h2>{t('Наши услуги')}</h2>
                <div className={'heading_line'}></div>
                <div className={'cards_wrapper'}>
                    <Card style={{ width: '350px', padding: '20px', color: '#777' }}>
                        <div className={'price_icon_wrap'}>
                            <i className="bs bs-scissors-1"></i>
                        </div>
                        <div className={'price_item'}>
                            <h4>{t('Стрижка и укладка')}
                                {/*<span className={'price'}>180 лей</span>*/}
                            </h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/>
                                </div>
                                <div>45 {t('минут')}</div>
                            </div>
                        </div>
                        <div className={'price_item'}>
                            <h4>{t('Моделирование бороды')}
                                {/*<span className={'price'}>130 лей</span>*/}
                            </h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                                <div>30 {t('минут')}</div>
                            </div>
                        </div>
                        <div className={'price_item'}>
                            <h4>{t('Стрижка+борода (комплекс)')}
                            {/*<span className={'price'}>250 лей</span>*/}
                        </h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                                <div>60 {t('минут')}</div>
                            </div>
                        </div>
                    </Card>
                    <Card style={{ width: '350px', padding: '20px', color: '#777' }}>
                        <div className={'price_icon_wrap'}>
                            <i className="bs bs-razor-2"></i>
                        </div>
                        <div className={'price_item'}>
                            <h4>{t('Бритьё')}
                                {/*<span className={'price'}>150 лей</span>*/}
                            </h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                                <div>30 {t('минут')}</div>
                            </div>
                        </div>
                        <div className={'price_item'}>
                            <h4>{t('Камуфлирование бороды')}
                                {/*<span className={'price'}>100 лей</span>*/}
                            </h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                                <div>20 {t('минут')}</div>
                            </div>
                        </div>
                        <div className={'price_item'}>
                            <h4>{t('Королевское бритьё')}
                                {/*<span className={'price'}>100 лей</span>*/}
                            </h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                                <div>30 {t('минут')}</div>
                            </div>
                        </div>
                    </Card>
                    <Card style={{ width: '350px', padding: '20px', color: '#777' }}>
                        <div className={'price_icon_wrap'}>
                            <i className="bs bs-hairbrush-1"></i>
                        </div>
                        <div className={'price_item'}>
                            <h4>{t('Ваксинг: 1 зона')}
                                {/*<span className={'price'}>50 лей</span>*/}
                            </h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                                <div>10 {t('минут')}</div>
                            </div>
                        </div>
                        <div className={'price_item'}>
                            <h4>{t('Ваксинг: комплекс')}
                                {/*<span className={'price'}>150 лей</span>*/}
                            </h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                                <div>25 {t('минут')}</div>
                            </div>
                        </div>
                        <div className={'price_item'}>
                            <h4>{t('Укладка')}
                                {/*<span className={'price'}>150 лей</span>*/}
                            </h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                                <div>20 {t('минут')}</div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Services;