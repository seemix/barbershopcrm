import React from 'react';
import { Card } from '@mui/material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

import './SingleServicePrice.css';

const SingleServicePrice = (props: any) => {
    const { service } = props;
    return (
        <Card className={'single_service_card'}>
            <h5>{service.service.name}</h5>
            <div className={'single_service_wrapper'}>
                <div className={'single_service_int_wrap'}>
                    <AccessTimeIcon/> {service.duration} min.
                </div>
                <div className={'single_service_int_wrap'}><LocalAtmIcon/> {service.price} MDL
                </div>
            </div>
            <ul>
                {service.additionals?.map(item => <li key={item._id}><small>{item.additional.name}</small></li>)}
            </ul>
            <div className={'single_service_bottom'}>
                <Button><EditIcon/></Button>
                <Button><DeleteForeverIcon/></Button>
            </div>
        </Card>
    );
};

export default SingleServicePrice;