import React, { useState } from 'react';
import { Card } from '@mui/material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

import './SingleServicePrice.css';
import { useAppDispatch } from '../../../hooks/redux';
import { deleteBarberService, openBarberServiceModal, setBarberServiceForEdit } from '../../../store/barberService';
import { IAdminBarberService } from '../../../interfaces/barber-service.model';

const SingleServicePrice = (service: IAdminBarberService) => {
    const dispatch = useAppDispatch();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const handleDelete = () => {
        dispatch(deleteBarberService(service._id));
    }
    const handleEdit = () => {
        dispatch(setBarberServiceForEdit(service));
        dispatch(openBarberServiceModal());
    };
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
                {service.additionals && service.additionals?.map(item => <li
                    key={item._id}>{item.additional?.name}</li>)}
            </ul>
            <div className={'single_service_bottom'}>
                <Button><EditIcon onClick={handleEdit}/></Button>
                {!confirmDelete && <Button><DeleteForeverIcon onClick={() => setConfirmDelete(true)}/></Button>}
                {confirmDelete && <>
                    <Button onClick={() => setConfirmDelete(false)}>отмена</Button>
                    <Button onClick={handleDelete}>удалить</Button>
                </>}
            </div>
        </Card>
    );
};

export default SingleServicePrice;