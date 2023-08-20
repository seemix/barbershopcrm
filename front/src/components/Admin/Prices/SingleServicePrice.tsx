import React from 'react';
import { Card } from '@mui/material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

import './SingleServicePrice.css';
import { useAppDispatch } from '../../../hooks/redux';
import { openBarberServiceModal, setBarberServiceForEdit } from '../../../store/barberService';

const SingleServicePrice = (props: any) => {
    const { service } = props;
    const dispatch = useAppDispatch();
    // const {} = useAppSelector(state => state.barberServiceStore);
    const handleEdit = () => {
        dispatch(setBarberServiceForEdit(service));
        dispatch(openBarberServiceModal());
    }
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
            </ul>
            <div className={'single_service_bottom'}>
                <Button><EditIcon onClick={handleEdit}/></Button>
                <Button><DeleteForeverIcon/></Button>
            </div>
        </Card>
    );
};

export default SingleServicePrice;