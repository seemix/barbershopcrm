import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import SingleBarberPrice from './SingleBarberPrice';
import { getAllBarberServices } from '../../../store/barberService';
import './Prices.css';

const Prices = () => {

    const dispatch = useAppDispatch();
    const { services } = useAppSelector(state => state.barberServiceStore);
    useEffect(() => {
        dispatch(getAllBarberServices());
    }, [dispatch]);
    return (
        <div className={'content'}>
            <h2>Prices</h2>

                {
                    services.map(item => <SingleBarberPrice barber={item.barber} services={item.services}/>)
                }
        </div>
    );
};

export default Prices;