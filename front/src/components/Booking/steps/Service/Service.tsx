import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Card } from '@mui/material';

import './Service.css';
import { IService } from '../../../../interfaces/service.model';
import { setService } from '../../../../store/order';
import { useTranslation } from 'react-i18next';

const Service = (item: IService) => {
    const { t } = useTranslation();
    const order = useAppSelector(state => state.orderStore);
    const dispatch = useAppDispatch();
    const handleSelect = () => {
        dispatch(setService({ serviceId: item.service._id, duration: item.duration, price: item.price }));
    };
    return (
        <>
            <Card className={item.service._id === order.serviceId ? 'service_card card_select' : 'service_card'}
                  onClick={handleSelect}
            >
                {order.serviceId && order.serviceId !== item.service._id &&
                    <div className={'unselected_hover'}></div>
                }
                <div style={{ marginLeft: '10px' }}>
                    <h4><i className={'bs bs-scissors-1'}/> {t(`${item.service.name}`)} </h4>
                    <div className={'time_wrapper section_caption'}>
                        <div className={'time_icon'}><AccessTimeIcon fontSize={'small'}/></div>
                        <div>{item.duration} {t('минут')}</div>
                    </div>
                </div>
                <div>
                    <h3><b><big>{item.price} </big><small>MDL</small></b></h3>
                </div>
            </Card>
        </>
    );
};

export default Service;