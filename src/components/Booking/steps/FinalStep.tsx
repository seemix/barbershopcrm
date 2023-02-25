import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Card } from '@mui/material';
import { getRecordById } from '../../../store/record';

const FinalStep = () => {
    const { orderId } = useAppSelector(state => state.orderStore);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getRecordById(String(orderId)));
    }, [dispatch, orderId]);
    const { customer, barber, startTime, additional, service } = useAppSelector(state => state.recordStore);
    const date = new Date(String(startTime));
    const dateOut = date.toLocaleDateString('ru-RU', {
        weekday: 'short',  month: 'long', day: 'numeric'
    });
    const time = startTime?.split('T')[1].slice(0,5)    ;
    return (
        <div>
            <h3>Final step</h3>
            <Card style={{ padding: '25px' }}>
                <h2>Dear {customer.name} !</h2>
                <big><p>{barber.name} will wait for you at {dateOut} в {time}</p></big>
                <p>Your order:</p>
                <li><p>{service.name}</p></li>
                {additional.map(item => <li><p>{item.name}</p></li>)}
            </Card>
        </div>
    );
};

export default FinalStep;