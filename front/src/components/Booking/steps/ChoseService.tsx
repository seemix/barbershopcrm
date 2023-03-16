import React, { useEffect } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getServicesByBarber } from '../../../store/services';
import Service from './Service/Service';
import { handleBack, handleNext } from '../../../store/stepper';
import '../Booking.css';
import { resetService } from '../../../store/order';
import { useTranslation } from 'react-i18next';

const ChoseService = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { serviceId, barberId } = useAppSelector(state => state.orderStore);
    const { services, status } = useAppSelector(state => state.serviceStore);
    const handleBackButton = () => {
        dispatch(resetService());
        dispatch(handleBack());
    };
    useEffect(() => {
        dispatch(getServicesByBarber(String(barberId)));
    }, [dispatch, barberId]);
    return (
        <div>
            <h3>{t('Выберите услугу')}</h3>
            <div className={'selector_wrapper'}>
                {status === 'loading' && <CircularProgress/>}
                {status === 'fulfilled' && services && services.map(item =>
                    <Service _id={item._id}
                             service={item.service}
                             price={item.price}
                             duration={item.duration}
                    />)
                }
                <div className={'buttons_wrapper'}>
                    <div>
                        {
                            <Button variant={'contained'}
                                    onClick={handleBackButton}
                                    style={{ marginBottom: '20px', padding: '10px 15px' }}> <KeyboardArrowLeft/> {t('назад')}
                            </Button>
                        }
                    </div>
                    <div>
                        {
                            serviceId &&
                            <Button variant={'contained'}
                                    onClick={() => dispatch(handleNext())}
                                    style={{ marginBottom: '20px', padding: '10px 15px' }}> {t('далее')} <KeyboardArrowRight/>
                            </Button>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ChoseService;