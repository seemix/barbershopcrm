import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { searchCustomers } from '../../../../store/customer';
import { resetCustomer, setCustomer } from '../../../../store/order';

const SelectUser = () => {
    const [q, setQ] = useState('');
    const { customers } = useAppSelector(state => state.customersStore);
    const order = useAppSelector(state => state.orderStore);
    const [value, setValue] = React.useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (q.length > 2) dispatch(searchCustomers(q));
        if(order.customerName) {setValue(order.customerName+' ('+order.customerPhone+')')}
        else { setValue('')}
    }, [q, order.customerName, order.customerPhone]);

    return (
        <>{
            //order.customerName &&
            <Autocomplete
               // defaultValue={order.customerName}
                value={String(value)}
                onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                    if (newValue) {
                        dispatch(setCustomer(newValue));
                    } else {
                        dispatch(resetCustomer());
                    }
                }}
                inputValue={q}
                onInputChange={(event, q) => {
                    setQ(q);
                }}
                id="controllable-states-demo"
                options={customers}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params}
                                                    label={'клиент'}/>}/>
        }
        </>
    );
};

export default SelectUser;