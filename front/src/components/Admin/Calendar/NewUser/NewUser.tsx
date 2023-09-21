import React from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch } from '../../../../hooks/redux';
import { setCustomerEmail, setCustomerName, setCustomerPhone } from '../../../../store/order';

const NewUser = () => {
    const dispatch = useAppDispatch();

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <div>
                <TextField style={{ width: '200px' }}
                           size={'small'}
                           label={'Телефон'}
                           onChange={(e) => dispatch(setCustomerPhone(e.target.value))}
                />
            </div>
            <div>
                <TextField style={{ width: '200px' }}
                           size={'small'}
                           label={'Имя/Фамилия'}
                           onChange={(e) => dispatch(setCustomerName(e.target.value))}
                />
            </div>
            <div>
                <TextField style={{ width: '200px' }}
                           size={'small'}
                           label={'email'}
                           onChange={(e) => dispatch(setCustomerEmail(e.target.value))}
                />
            </div>
        </div>
    );
};

export default NewUser;