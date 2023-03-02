import React, { useEffect } from 'react';
import { Card, CircularProgress } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getRecordById } from '../../../store/record';
import { createOrder } from '../../../store/order';

const FinalStep = () => {
    const order = useAppSelector(state => state.orderStore);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(createOrder(order));
    }, []);
    useEffect(() => {
        if (order.orderId) dispatch(getRecordById(String(order.orderId)));
    }, [dispatch, order.orderId]);
    const {
        customer,
        barber,
        startTime,
        price,
        additional,
        service,
        status
    } = useAppSelector(state => state.recordStore);
    const date = new Date(String(startTime));
    const dateOut = date.toLocaleDateString('ru-RU', {
        weekday: 'short', month: 'long', day: 'numeric'
    });
    const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    return (
        <div>
            <h3>Final step</h3>
            <Card style={{ padding: '25px', maxWidth: '500px' }}>
                <div className={'selector_wrapper'}>
                    {status === 'loading' && <CircularProgress/>}
                </div>
                {status === 'fulfilled' && <div>
                    <p style={{ fontSize: '22px', textAlign: 'center' }}>Dear {customer.name} !</p>
                    <big><p style={{ textAlign: 'center' }}>{barber.name} будет ждать вас <u> {dateOut} в {time} </u>
                    </p></big>
                    <p>Ваш заказ:</p>
                    <div style={{ marginLeft: '15px' }}>
                        <p><i className={'bs bs-scissors-1'}/> {service.name}</p>
                        {additional.map(item => <><p><i className="bs bs-hairbrush-1"></i> {item.name}</p></>)}
                    </div>
                    <hr/>
                    <p style={{ textAlign: 'right' }}>Общая сумма {price} MDL</p>
                    <p>Для отмены или изменения записи воспользуйтесь ссылкой на почте <big>{customer.email} </big>
                        или перезвоните по номеру <big> 555-555-555 </big></p>
                </div>
                }
            </Card>
        </div>
    );
};

export default FinalStep;