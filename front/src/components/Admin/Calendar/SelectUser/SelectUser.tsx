import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { searchCustomers } from '../../../../store/customer';
import { resetCustomer, setCustomer } from '../../../../store/order';

const SelectUser = () => {
    const [query, setQuery] = useState('');
    const { customers } = useAppSelector(state => state.customersStore);
    const {customerPhone, customerName} = useAppSelector(state => state.orderStore);
    const [value, setValue] = React.useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(customerPhone && customerName) setValue(customerName + '(' + customerPhone + ')');
    }, [customerPhone, customerPhone]);

    useEffect(() => {
        if (query.length > 2) dispatch(searchCustomers(query));
    }, [query, customerName, customerPhone, dispatch]);
    return (
        <>{
            <Autocomplete
                value={value || ''}
                onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                    if (newValue) {
                        dispatch(setCustomer(newValue));
                    } else {
                        dispatch(resetCustomer());
                    }
                }}
                inputValue={query}
                onInputChange={(event, query) => {
                    setQuery(query);
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