import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getAdditionalsByBarberAndService } from '../../../store/additional';
import Additional from './Additional/Additional';
import Button from '@mui/material/Button';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { handleBack, handleNext } from '../../../store/stepper';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const ChoseAdditional = () => {
    const dispatch = useAppDispatch();
    const { additionals } = useAppSelector(state => state.additionalStore);
    const { serviceId, barberId } = useAppSelector(state => state.orderStore);
    useEffect(() => {
        dispatch(getAdditionalsByBarberAndService({ barberId, serviceId }));
    }, []);
    return (
        <div>
            <h3>Chose additional service</h3>
            <div className={'selector_wrapper'}>
                {
                    additionals.map(item => <Additional
                        _id={item._id}
                        barber={item.barber}
                        additional={item.additional}
                        price={item.price}
                        duration={item.duration}/>)
                }
            </div>
            <div className={'buttons_wrapper'}>
                <div>
                    {
                        <Button variant={'contained'}
                                onClick={() => dispatch(handleBack())}
                                style={{ marginBottom: '20px', padding: '10px 15px' }}> <KeyboardArrowLeft/> Назад
                        </Button>
                    }
                </div>
                <div>
                    {
                        serviceId &&
                        <Button variant={'contained'}
                                onClick={() => dispatch(handleNext())}
                                style={{ marginBottom: '20px', padding: '10px 15px' }}> Далее <KeyboardArrowRight/>
                        </Button>
                    }
                </div>

            </div>
        </div>
    )}

export default ChoseAdditional;