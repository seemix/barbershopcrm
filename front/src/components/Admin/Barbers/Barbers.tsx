import React, { useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { Button } from '@mui/material';

import SingleBarber from './SingleBarber';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { barbersReorder, getAllBarbers, saveBarberOrder } from '../../../store/barbers';
import './Barbers.css';
const Barbers = () => {
    const dispatch = useAppDispatch();
    const { barbers, reorderButton } = useAppSelector(state => state.barberStore);

    useEffect(() => {
        dispatch(getAllBarbers());
    }, [dispatch]);

    const reOrder = (newOrder: any) => {
        dispatch(barbersReorder(newOrder));
    };

    return (
        <div className={'admin_content'} style={{paddingBottom: '20px'}}>
            <h2>Barbers</h2>
            <h3>drag-n-drop to change order</h3>
            <div className={'barbers_admin_reorder_wrap'}>
                {reorderButton && <Button onClick={() => dispatch(saveBarberOrder(barbers))}>Сохранить порядок</Button>}
                <div>
                    <Reorder.Group values={barbers} onReorder={(newOrder) => reOrder(newOrder)} as={'ol'}>
                        {barbers && barbers.map(barber => (
                            <Reorder.Item key={barber._id} value={barber} whileDrag={{ scale: 1.05 }}>
                                <SingleBarber _id={barber._id} name={barber.name} description={barber.description}
                                              picture={barber.picture} rating={barber.rating}
                                              isActive={barber.isActive}/>
                            </Reorder.Item>))}
                    </Reorder.Group>
                </div>
            </div>
        </div>
    );
};

export default Barbers;