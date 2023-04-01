import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import SingleBarberPrice from './SingleBarberPrice';
import { getAllBarberServices } from '../../../store/barberService';

const Prices = () => {
    const dispatch = useAppDispatch();
    const { services } = useAppSelector(state => state.barberServiceStore);
    useEffect(() => {
          dispatch(getAllBarberServices());
    }, []);
    return (
        <div>
            <h2>Prices</h2>
            {
                services.map(item => <SingleBarberPrice barber={item.barber} price={item.price} service={item.service}
                                                        duration={item.duration} />)
            }
        </div>
    );
};

export default Prices;