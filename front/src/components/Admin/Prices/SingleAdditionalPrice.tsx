import React from 'react';
import { IBarberAdditional } from '../../../interfaces/additional.model';

import './SingleServicePrice.css';
import { Card } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch } from '../../../hooks/redux';
import { openBarberAddModal, setBarberAddForUpdate } from '../../../store/barberAdditional';

const SingleAdditionalPrice = (item: IBarberAdditional) => {
    const { additional, price, duration } = item;
    const dispatch = useAppDispatch();
    const handleEdit = () => {
        dispatch(setBarberAddForUpdate(item));
        dispatch(openBarberAddModal());
    };
    return (
        <Card className={'single_service_card'}>
            <h5>{additional.name}</h5>
            <div className={'single_service_wrapper'}>
                <div className={'single_service_int_wrap'}><AccessTimeIcon/>{duration} мин.</div>
                <div className={'single_service_int_wrap'}><LocalAtmIcon/>{price} MDL</div>
            </div>
            <div className={'single_service_bottom'}>
                <Button><EditIcon onClick={handleEdit}/></Button>
                <Button><DeleteForeverIcon/></Button>
            </div>
        </Card>
    );
};

export default SingleAdditionalPrice;