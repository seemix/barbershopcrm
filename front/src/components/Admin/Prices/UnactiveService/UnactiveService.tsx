import React from 'react';
import { IAllService } from '../../../../interfaces/service.model';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';

const UnactiveService = (item: IAllService) => {
    const { name, _id, barber } = item;
    const handleClick = () => {
        console.log('clicked!'+_id+barber);
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