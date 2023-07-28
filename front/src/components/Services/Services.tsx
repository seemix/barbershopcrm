import React, { FC } from 'react';
import { Card } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import './Services.css';
import { topAnimation, titleAnimation, bottomAnimation, blockAnimation } from '../../constants/animations';

const Services: FC = () => {
    const { t } = useTranslation();
    return (
        <div className={'services'} id={'services'}>
            <div className={'section_caption'}>
                <motion.h3
                    custom={2}
                    initial={'hidden'}
                    whileInView={'visible'}
                    variants={topAnimation}
                >LevelUP Barbershop
                </motion.h3>
                <motion.h2
                    custom={3.5}
                    initial={'hidden'}
                    whileInView={'visible'}
                    variants={titleAnimation}
                >{t('Наши услуги')}
                </motion.h2>
                <motion.div
                    custom={2}
                    initial={'hidden'}
                    whileInView={'visible'}
                    variants={bottomAnimation}
                    className={'heading_line'}>
                </motion.div>
                <div className={'cards_wrapper'}>
                    <motion.div
                        custom={2.5}
                        initial={'hidden'}
                        whileInView={'visible'}
                        variants={blockAnimation}
                    >
                        <Card className={'services_card'}>
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
                    </motion.div>
                    <motion.div
                        custom={3}
                        initial={'hidden'}
                        whileInView={'visible'}
                        variants={blockAnimation}
                    >
                    <Card className={'services_card'}>
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
                    </motion.div>
                    <motion.div
                        custom={3.5}
                        initial={'hidden'}
                        whileInView={'visible'}
                        variants={blockAnimation}
                    >
                    <Card className={'services_card'}>
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
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Services;