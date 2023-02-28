import React, { FC } from 'react';
import { Card } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import './Services.css';

const Services: FC = () => {
    return (
        <div className={'services'} id={'services'}>
            <div className={'section_caption'}>
                <h3>LevelUP Barbershop</h3>
                <h2>Наши услуги</h2>
                <div className={'heading_line'}></div>
                <div className={'cards_wrapper'}>
                    <Card style={{ width: '350px', padding: '20px', color: '#777' }}>
                        <div className={'price_icon_wrap'}>
                            <i className="bs bs-scissors-1"></i>
                        </div>
                        <div className={'price_item'}>
                            <h4>Стрижка и укладка <span className={'price'}>180 лей</span></h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/>
                                </div>
                                <div>45 минут</div>
                            </div>
                        </div>
                        <div className={'price_item'}>
                            <h4>Моделирование бороды <span className={'price'}>130 лей</span></h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                                <div>30 минут</div>
                            </div>
                        </div>
                        <div className={'price_item'}>
                            <h4>Стрижка+борода </h4><h4> (комплекс)<span className={'price'}>250 лей</span></h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                                <div>60 минут</div>
                            </div>
                        </div>
                    </Card>
                    {/*</div>*/}
                    <Card style={{ width: '350px', padding: '20px', color: '#777' }}>
                        {/*<div className={'card'}>*/}
                        <div className={'price_icon_wrap'}>
                            <i className="bs bs-razor-2"></i>
                        </div>
                        <div className={'price_item'}>
                            <h4>Бритьё <span className={'price'}>150 лей</span></h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                                <div>30 минут</div>
                            </div>
                        </div>
                        <div className={'price_item'}>
                            <h4>Камуфлирование седины <span className={'price'}>100 лей</span></h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                                <div>30 минут</div>
                            </div>
                        </div>
                        <div className={'price_item'}>
                            <h4>Запись вне рабочих часов <span className={'price'}>100 лей</span></h4>
                        </div>
                        {/*</div>*/}
                    </Card>
                    <Card style={{ width: '350px', padding: '20px', color: '#777' }}>
                        <div className={'price_icon_wrap'}>
                            <i className="bs bs-hairbrush-1"></i>
                        </div>
                        <div className={'price_item'}>
                            <h4>Ваксинг: 1 зона <span className={'price'}>50 лей</span></h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                                <div>10 минут</div>
                            </div>
                        </div>
                        <div className={'price_item'}>
                            <h4>Ваксинг: комплекс <span className={'price'}>150 лей</span></h4>
                            <div className={'time_wrapper'}>
                                <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                                <div>25 минут</div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Services;