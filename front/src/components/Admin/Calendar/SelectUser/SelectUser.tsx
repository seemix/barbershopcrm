import React, { useEffect, useState } from 'react';
import { Autocomplete, Card, TextField } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { searchCustomers } from '../../../../store/customer';
import { setCustomer } from '../../../../store/order';

interface IUserProps {
    _id: string | null;
    name: string;
    phone: string;
}

const SelectUser = () => {
    const [q, setQ] = useState('');
    const { customers } = useAppSelector(state => state.customersStore);
    const [value, setValue] = React.useState<string | null>(null);

    const [inputValue, setInputValue] = React.useState('');
    const dispatch = useAppDispatch();
    console.log(value);
    const handleChange = (e: any) => {
        setQ(q => e.target.value);
    };
    useEffect(() => {
        if (q.length > 2) dispatch(searchCustomers(q));
    }, [q]);
    return (
        <>
            <Autocomplete
                onChange={(event: any, newValue: string | null) => {
                    dispatch(setCustomer(newValue));
                }}
                inputValue={inputValue || ''}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                // disablePortal
                id="combo-box-demo"
                options={customers}
                sx={{ width: 300 }}

                renderInput={(params) => <TextField {...params} label="клиент" />}/>
        </>

        // <Card style={{ padding: '10px', backgroundColor: '#fcf9f5' }}>
        //     <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        //         <div style={{ display: 'flex', flexDirection: 'column', }}>
        //             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        //                 <div><FaceIcon/></div>
        //                 <div>{user.name}</div>
        //
        //             </div>
        //             <div style={{textAlign:'center'}}>
        //                 <p>{user.phone}</p>
        //             </div>
        //
        //         </div>
        //         <div>
        //             <CloseIcon fontSize={'medium'}/>
        //         </div>
        //     </div>
        // </Card>


    );
};

export default SelectUser;