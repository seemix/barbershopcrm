import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './Prices.css';
import { getAllBarbers } from '../../../store/barbers';
import { Avatar, Card } from '@mui/material';
import { Link } from 'react-router-dom';

const Prices = () => {

    const dispatch = useAppDispatch();
    const { barbers } = useAppSelector(state => state.barberStore);

    useEffect(() => {
        dispatch(getAllBarbers());
    }, [dispatch]);

    return (
        <div className={'content'} >
            <h4 style={{margin: '0 auto'}}>Цены</h4>
            <h3>Choose the barber</h3>
            {barbers && barbers.map(barber =>
                <div key={barber._id} style={{display: 'flex', justifyContent: 'center'}}>
                    <Link to={barber._id}>
                        <Card className={'barber_card_price'}>
                        <Avatar src={barber.picture}
                                sx={{ width: 65, height: 65 }}/>
                        <p>{barber.name}</p>
                        </Card>
                    </Link>
                </div>)}

        </div>
    );
};

export default Prices;