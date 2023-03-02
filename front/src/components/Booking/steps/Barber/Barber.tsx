import React from 'react';
import { IBarber } from '../../../../interfaces/barber.model';
import { Avatar, Card, Rating } from '@mui/material';

import './Barber.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setBarber } from '../../../../store/order';

const Barber = (barber: IBarber) => {

    const order = useAppSelector(state => state.orderStore);
    const dispatch = useAppDispatch();
    const handleSelect = () => {
        dispatch(setBarber(barber._id));
    };
    return (
        <>
            <Card className={barber._id === order.barberId ? 'barber_card card_select' : 'barber_card'}
                  onClick={handleSelect}>
                {order.barberId && order.barberId !== barber._id &&
                    <div className={'unselected_hover'}></div>
                }
                <Avatar src={barber.picture}
                        sx={{ width: 80, height: 80 }}/>

                <h4>{barber.name} </h4>
                <h4><small> {barber.description}</small></h4>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Rating defaultValue={1} max={1} readOnly={true}/>
                    <h4>
                        <big>
                            {barber.rating && Number(barber.rating).toFixed(1)}
                        </big>
                    </h4>
                </div>

            </Card>
        </>
    );
};

export default Barber;