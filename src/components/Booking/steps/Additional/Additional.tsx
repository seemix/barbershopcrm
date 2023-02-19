import React, { useState } from 'react';
import { Card } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { IAdditional } from '../../../../models/additional.model';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { addAdditional, removeAdditional } from '../../../../store/order';

const Additional = (item: IAdditional) => {
    const { additionalServices } = useAppSelector(state => state.orderStore);
    const [selected, setSelected] = useState<boolean>(additionalServices.includes(item.additional._id));
    const dispatch = useAppDispatch();
    const handleSelect = () => {
        if (!selected) {
            dispatch(addAdditional({ _id: item.additional._id, duration: item.duration, price: item.price }));
            setSelected(true);
        } else {
            dispatch(removeAdditional({ _id: item.additional._id, duration: item.duration, price: item.price }));
            setSelected(false);
        }
    };
    return (
        <>
            <Card className={selected ? 'service_card card_select' : 'service_card'}
                  onClick={handleSelect}>
                <h4> {item.additional.name} </h4>
                <div className={'time_wrapper'}>
                    <div><AccessTimeIcon fontSize={'small'}/>
                    </div>
                    <div><h4><small>{item.duration} минут</small></h4></div>
                </div>
                <h3><big>{item.price} </big> лей</h3>
            </Card>
        </>
    );
};

export default Additional;