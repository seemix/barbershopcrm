import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import Button from '@mui/material/Button';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { handleNext } from '../../../store/stepper';
import { getAllBarbers } from '../../../store/barbers';
import Barber from './Barber/Barber';
import '../Booking.css';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ChoseBarber = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllBarbers());
    }, [dispatch]);
    const { barbers, status } = useAppSelector(state => state.barberStore);
    const activeBarbers = barbers.filter(barber => barber.isActive);
    const { barberId } = useAppSelector(state => state.orderStore);
    return (
        <>
            <h3>{t('Выберите мастера')}</h3>
            <div className={'selector_wrapper'}>
                {status === 'loading' && <CircularProgress/>}
                {status === 'fulfilled' &&
                    <div>
                        {activeBarbers &&
                            activeBarbers.map(barber => <Barber
                                key={barber._id}
                                description={barber.description}
                                name={barber.name}
                                picture={barber.picture}
                                rating={barber.rating}
                                isActive={barber.isActive}
                                _id={barber._id}
                            />)
                        }
                    </div>
                }
                <div></div>
                <div className={'buttons_wrapper'}>
                    <div></div>
                    <div>
                        {barberId &&
                            <Button variant={'contained'}
                                    onClick={() => dispatch(handleNext())}
                                    style={{ marginBottom: '20px', padding: '10px 15px' }}> {t('далее')} <KeyboardArrowRight/>
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChoseBarber;