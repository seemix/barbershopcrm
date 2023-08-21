import React from 'react';
import { IAllService } from '../../../../interfaces/service.model';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../../../hooks/redux';
import { openBarberServiceModal, setBarberServiceForCreate } from '../../../../store/barberService';

const UnactiveService = (item: IAllService) => {
    const { name, _id, barber } = item;
    const dispatch = useAppDispatch();
    const handleClick = () => {
        dispatch(setBarberServiceForCreate({ barber, service: { _id, name: item.name } }));
        dispatch(openBarberServiceModal());
    };
    return (
        <div>
            <Card className={'single_service_card'}>
                <h5><i>{name}</i>
                    <Button onClick={handleClick}>
                        +
                    </Button>
                </h5>
            </Card>
        </div>
    );
};

export default UnactiveService;