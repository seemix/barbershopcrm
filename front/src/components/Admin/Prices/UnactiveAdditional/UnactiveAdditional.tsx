import React from 'react';
import Button from '@mui/material/Button';
import { Card } from '@mui/material';
import { openBarberAddModal, setBarberAddForUpdate, setCreateBarberAdd } from '../../../../store/barberAdditional';
import { useAppDispatch } from '../../../../hooks/redux';
import { IAdd } from '../../../../interfaces/additional.model';

const UnactiveAdditional = (item: IAdd) => {
    const { name, barberId, _id } = item;
    const dispatch = useAppDispatch();
    const handleClick = () => {
        dispatch(openBarberAddModal());
        dispatch(setBarberAddForUpdate({
            barber: barberId,
            additional: {
                _id,
                name
            }
        }));
        dispatch(setCreateBarberAdd());
    };
    return (
        <div>
            <Card className={'single_service_card'}>
                <h5><i>{name}</i>
                    <Button onClick={handleClick}>+ </Button>
                </h5>
            </Card>
        </div>
    );
};

export default UnactiveAdditional;