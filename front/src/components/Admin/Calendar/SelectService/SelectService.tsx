import React from 'react';
import { IService } from '../../../../interfaces/service.model';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setService } from '../../../../store/order';
import { Card } from '@mui/material';
import './SelectService.css';

const SelectService = (item: IService) => {
    const order = useAppSelector(state => state.orderStore);
    const dispatch = useAppDispatch();
 //   console.log(item.duration);
    const handleSelect = () => {
        dispatch(setService({ serviceId: item.service._id, duration: item.duration, price: item.price }));
    };
    return (
        <>
            <Card className={item.service._id === order.serviceId ? 'card card_select' : 'card'}
                  onClick={handleSelect}
            >
                {order.serviceId && order.serviceId !== item.service._id &&
                    <div className={'unselected_hover'}></div>
                }
                <div style={{ margin: '10px' }}>
                    {item.service.name} <small>{item.duration}м/{item.price}MDL</small>
                </div>
            </Card>
        </>
    );
};

export default SelectService;