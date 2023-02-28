import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getServicesByBarber } from '../../../store/services';
import Service from './Service/Service';
import Button from '@mui/material/Button';
import { handleBack, handleNext } from '../../../store/stepper';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import '../Booking.css';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { resetService } from '../../../store/order';
import { CircularProgress } from '@mui/material';

const ChoseService = () => {
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
            <h3>Choose Service</h3>
            <div className={'selector_wrapper'}>
                {status === 'loading' && <CircularProgress/>}
                    {services && services.map(item =>
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

        </div>
    );
};

export default ChoseService;