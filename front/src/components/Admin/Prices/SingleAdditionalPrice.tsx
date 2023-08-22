import React, { useEffect, useState } from 'react';
import { IBarberAdditional } from '../../../interfaces/additional.model';

import './SingleServicePrice.css';
import { Card } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { deleteBarberAdditionalById, openBarberAddModal, setBarberAddForUpdate } from '../../../store/barberAdditional';
import { filterDeletedAdditionals } from '../../../store/barberService';

const SingleAdditionalPrice = (item: IBarberAdditional) => {
    const { additional, price, duration } = item;
    const dispatch = useAppDispatch();
    const { deletedAdd } = useAppSelector(state => state.barberAdditionalStore);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const handleEdit = () => {
        dispatch(setBarberAddForUpdate(item));
        dispatch(openBarberAddModal());
    };
    useEffect(() => {
        if (deletedAdd !== '') dispatch(filterDeletedAdditionals(deletedAdd));
    }, [deletedAdd]);
    const handleDelete = () => {
        dispatch(deleteBarberAdditionalById(String(item._id)));
    };
    return (
        <Card className={'single_service_card'}>
            <h5>{additional.name}</h5>
            <div className={'single_service_wrapper'}>
                <div className={'single_service_int_wrap'}><AccessTimeIcon/>{duration} мин.</div>
                <div className={'single_service_int_wrap'}><LocalAtmIcon/>{price} MDL</div>
            </div>
            <div className={'single_service_bottom'}>
                {!confirmDelete && <>
                    <Button><EditIcon onClick={handleEdit}/></Button>
                    <Button onClick={() => setConfirmDelete(true)}><DeleteForeverIcon/></Button>
                </>}
                {confirmDelete && <>
                    <Button onClick={() => setConfirmDelete(false)}>отмена</Button>
                    <Button onClick={handleDelete}>удалить</Button>
                </>}
            </div>
        </Card>
    );
};

export default SingleAdditionalPrice;