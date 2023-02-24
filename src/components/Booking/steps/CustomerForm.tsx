import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, InputAdornment, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { AccountCircle } from '@mui/icons-material';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getCustomerByPhone } from '../../../store/order';

const CustomerForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const dispatch = useAppDispatch();
    const order = useAppSelector(state => state.orderStore);
    const [phone, setPhone] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const handleChange = (e: any) => {
        e.preventDefault();
        setDisabled(false);
        let phoneLength = e.target.value;
        if (phoneLength.length === 10) setPhone(e.target.value);
    };

    useEffect(() => {
        dispatch(getCustomerByPhone(phone));
        setValue('customerName', order.customerName);
        setValue('customerEmail', order.customerEmail);
    }, [dispatch, phone, order, setValue]);
    return (
        <div>
            <h3>Fill the Form</h3>
            <div className={'selector_wrapper'}>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <Grid item xs={1} sm={1} paddingBottom={3}>
                        <TextField
                            onInput={(event) => handleChange(event)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIphoneOutlinedIcon/>
                                    </InputAdornment>
                                ),
                                style: { fontSize: 25, backgroundColor: '#fff', width: '250px' }
                            }}
                            label={'Номер телефона'}
                            variant={'outlined'}
                            size={'medium'}
                            autoComplete="Номер телефона"
                            {...register('customerPhone', {
                                required: 'This field is required',
                                // pattern: {
                                //     value: '',
                                //     message: 'Неверный формат'
                                // }
                            })}
                            error={!!errors.customerPhone}
                            helperText={errors?.customerPhone ? String(errors.customerPhone.message) : ''}
                        />
                    </Grid>
                    <Grid item xs={1} sm={1} paddingBottom={3}>
                        <TextField
                            disabled={disabled}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle/>
                                    </InputAdornment>
                                ),
                                style: { fontSize: 18 }
                            }}
                            style={{ backgroundColor: '#fff', width: '250px' }}
                            label={'Имя'}
                            variant={'outlined'}
                            size={'medium'}
                            autoComplete="name"
                            {...register('customerName', {
                                required: 'This field is required',
                                // pattern: {
                                //     value: '',
                                //     message: 'Неверный формат'
                                // }
                            })}
                            error={!!errors.customerName}
                            helperText={errors?.phone ? String(errors.phone.message) : null}
                        />
                    </Grid>
                    <Grid item xs={1} sm={1} paddingBottom={3}>
                        <TextField
                            disabled={disabled}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmailIcon/>
                                    </InputAdornment>
                                ),
                                style: { fontSize: 18, backgroundColor: '#fff', width: '250px' }
                            }}
                            label={'e-mail'}
                            variant={'outlined'}
                            size={'medium'}
                            autoComplete="e-mail"
                            {...register('customerEmail', {
                                required: 'This field is required',
                                // pattern: {
                                //     value: '',
                                //     message: 'Неверный формат'
                                // }
                            })}
                            error={!!errors.customerEmail}
                            helperText={errors?.phone ? String(errors.phone.message) : null}
                        />
                    </Grid>
                    <Grid item xs={1} sm={1}>
                        <Button fullWidth style={{ marginTop: '20px' }}
                                color={'primary'} type={'submit'} variant={'contained'}>Отправить</Button>
                    </Grid>
                </form>
            </div>
        </div>
    );
};

export default CustomerForm;