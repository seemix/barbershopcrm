import React from 'react';
import { IBarberService } from '../../../interfaces/barber-service.model';
const SingleBarberPrice = (item: IBarberService) => {
    return (
        <div>
            <h3>{item.barber.name}</h3>
            <h4>{item.service.name} - {item.price} - { item.duration}</h4>
        </div>
    );
};

export default SingleBarberPrice;