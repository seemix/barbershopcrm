import React from 'react';
import { IBarber } from '../../models/barber.model';
import { Card, CardMedia } from '@mui/material';

import './Barbers.css';

const BarberSingle = (barber: IBarber) => {
    return (
        <div className={'team_overlay'}>
            <Card style={{width: '350px'}}>
                <CardMedia
                    component={'img'}
                    alt={barber.name}
                    width="300"
                    image={barber.picture}
                />
                <h3>{barber.name}</h3>
                <h4>{barber.description}</h4>
            </Card>
        </div>
    );
};

export default BarberSingle;