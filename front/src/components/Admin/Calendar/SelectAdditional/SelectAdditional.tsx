import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { addAdditional, removeAdditional } from '../../../../store/order';
import { IAdditional } from '../../../../interfaces/additional.model';
import { Card } from '@mui/material';
import '../SelectService/SelectService.css';

const SelectAdditional = (item: IAdditional) => {
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
            <Card style={{ padding: '10px', backgroundColor: '#fcf9f5' }}
                  className={selected ? 'card card_select' : 'card'}
                  onClick={handleSelect}>
                {additionalServices.length > 0 && !additionalServices.includes(item.additional._id) &&
                    <div className={'unselected_hover'}></div>}
                <div>
                    {item.additional.name} <small> {item.duration}м/{item.price} MDL </small>
                </div>
            </Card>
        </>
    );
};

export default SelectAdditional;