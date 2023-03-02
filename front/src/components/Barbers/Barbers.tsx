import React, { FC, useEffect } from 'react';

import './Barbers.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllBarbers } from '../../store/barbers';
import BarberSingle from './BarberSingle';

const Barbers: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllBarbers());
    }, [dispatch]);
    const { barbers, status } = useAppSelector(state => state.barberStore);
    return (
        <div className={'barbers'}>
            <div className={'section_caption'}>
                <h3>LevelUP Barbershop</h3>
                <h2>Наши барберы</h2>
                <div className={'heading_line'}></div>
                <div className={'cards_wrapper'}>
                    {
                        status === 'fulfilled' &&
                        barbers && barbers.map(barber => <BarberSingle
                            key={barber._id}
                            description={barber.description}
                            name={barber.name}
                            picture={barber.picture}
                            rating={barber.rating}
                            isActive={barber.isActive}
                            _id={barber._id}
                        />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Barbers;