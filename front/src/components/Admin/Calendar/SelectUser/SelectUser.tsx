import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { searchCustomers } from '../../../../store/customer';
import { resetCustomer, setCustomer } from '../../../../store/order';
import { ISingleCustomer } from '../../../../interfaces/customer.model';

const SelectUser = () => {
    const [query, setQuery] = useState('');
    const { searchResult } = useAppSelector(state => state.customersStore);
    const {customerPhone, customerName} = useAppSelector(state => state.orderStore);
    const [value, setValue] = React.useState<any>(null);
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
                // @ts-ignore
                value={value || ''}
               // defaultValue={''}
                onChange={(event: any, newValue: string | null | ISingleCustomer) => {
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
                options={searchResult.map(customer => customer)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params}
                                                    label={'клиент'}/>}/>
        }
        </>
    );
};

export default SelectUser;