import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Card } from '@mui/material';

import { getAllBarbers } from '../../../store/barbers';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './Prices.css';

const Prices = () => {
    const dispatch = useAppDispatch();
    const { barbers } = useAppSelector(state => state.barberStore);

    useEffect(() => {
        dispatch(getAllBarbers());
    }, [dispatch]);

    return (
        <div className={'admin_content'} >
            <h3>Выберите барбера</h3>
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