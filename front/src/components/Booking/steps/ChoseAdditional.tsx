import React, { useEffect } from 'react';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import Additional from './Additional/Additional';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';

import { handleBack, handleNext } from '../../../store/stepper';
import { getAdditionalsByBarberAndService } from '../../../store/additional';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { resetAdditionals } from '../../../store/order';

const ChoseAdditional = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { serviceId, barberId } = useAppSelector(state => state.orderStore);

    useEffect(() => {
        dispatch(getAdditionalsByBarberAndService({ barberId, serviceId }));
    }, [barberId, dispatch, serviceId]);

    const { additionals, status } = useAppSelector(state => state.additionalStore);
    const handleBackButton = () => {
        dispatch(resetAdditionals());
        dispatch(handleBack());
    };
    return (
        <div>
            <h3>{t('Выберите дополнительные услуги')}</h3>
            <div className={'selector_wrapper'}>
                {status === 'loading' && <CircularProgress/>}
                {
                    additionals.map(item => <Additional
                        key={item._id}
                        _id={item._id}
                        barber={item.barber}
                        name={item.name}
                        price={item.price}
                        duration={item.duration}/>)
                }
                <div className={'buttons_wrapper'}>
                    <div>
                        <Button variant={'contained'}
                                onClick={handleBackButton}
                                style={{ marginBottom: '20px', padding: '10px 15px' }}>
                            <KeyboardArrowLeft/> {t('назад')}
                        </Button>
                    </div>
                    <div>
                        {serviceId &&
                            <Button variant={'contained'}
                                    onClick={() => dispatch(handleNext())}
                                    style={{ marginBottom: '20px', padding: '10px 15px' }}> {t('далее')}
                                <KeyboardArrowRight/>
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoseAdditional;