import React, { useState } from 'react';
import { Card } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { IAdditional } from '../../../../interfaces/additional.model';
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
                <div className={'price_item'} style={{ marginTop: '15px', marginLeft: '10px' }}>
                    <h4><i className="bs bs-hairbrush-1"></i> {item.additional.name} </h4>
                    <div className={'time_wrapper section_caption'}>
                        <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/>
                        </div>
                        <div>{item.duration} минут</div>
                    </div>
                </div>
                <div>
                    <h3><b><big>{item.price} </big> лей</b></h3>
                </div>
            </Card>
        </>
    );
};

export default Additional;