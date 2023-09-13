import React from 'react';
import { IBarber } from '../../../interfaces/barber.model';
import { Avatar, Button, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const SingleBarber = (barber: IBarber) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card className={'barber_card_price'} style={{ justifyContent: 'space-between' }}>
                <Avatar src={barber.picture} sx={{ width: 65, height: 65 }}/>
                <p>{barber.name}</p>
                <Button><EditIcon/></Button>
            </Card>
        </div>
    );
};

export default SingleBarber;