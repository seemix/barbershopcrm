import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { createOrder } from '../../../store/order';
import Button from '@mui/material/Button';
import { handleBack } from '../../../store/stepper';
import { KeyboardArrowLeft } from '@mui/icons-material';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Card } from '@mui/material';

const FinalStep = () => {
    const order = useAppSelector(state => state.orderStore);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(createOrder(order));
    }, [dispatch]);
    // useEffect(() => {
    //     dispatch()
    // }, []);
    return (
        <div>
            <h3>Final step</h3>
            <h2>
                {order.orderId && <Card>
                    NAME
                </Card>}
            </h2>
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
                        <Button variant={'contained'}
                            // onClick={ha}
                                style={{ marginBottom: '20px', padding: '10px 15px' }}> Далее <KeyboardArrowRight/>
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
};

export default FinalStep;