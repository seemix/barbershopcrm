import React from 'react';
import { motion } from 'framer-motion';

import { headerAnimation, buttonAnimation } from '../../constants/animations';
import { useTranslation } from 'react-i18next';
import { openBooking } from '../../store/order';
import { useAppDispatch } from '../../hooks/redux';
import { Link } from 'react-scroll';

const WelcomeButton = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const handleBooking = () => {
        dispatch(openBooking());
    };
    return (
        <>
            <div className={'overlay'}>
                <div className={'slider_welcome'}>
                    <motion.h1 custom={1.5} initial={'hidden'} whileInView={'visible'} variants={headerAnimation}>
                        {t('Добро пожаловать в')} LevelUP Barbeshop
                    </motion.h1>
                    <motion.div
                        custom={2}
                        initial={'hidden'}
                        whileInView={'visible'}
                        variants={buttonAnimation}>
                        <Link to={'booking'} smooth={true} spy={false} offset={-40}>
                            <button
                                onClick={handleBooking}
                                className={'button-5 booking'}>{t('ЗАПИСАТЬСЯ')}
                            </button>
                        </Link>
                    </motion.div>
                </div>

            </div>
        </>
    );
};

export default WelcomeButton;