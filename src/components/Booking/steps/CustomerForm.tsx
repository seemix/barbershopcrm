import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Grid, InputAdornment, TextField, Button } from '@mui/material';
import { AccountCircle, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { joiResolver } from '@hookform/resolvers/joi';

import userValidator from '../../../validators/user.validator';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { createOrder, getCustomerByPhone, setCustomer } from '../../../store/order';
import { handleBack, handleNext } from '../../../store/stepper';

const CustomerForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({ resolver: joiResolver(userValidator) });
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
    const handleNextButton = (data: FieldValues) => {
        dispatch(setCustomer(data));
        console.log(order.customerEmail);
        dispatch(createOrder(order));
      //  dispatch(handleNext());
    };
    useEffect(() => {
        if (phone) dispatch(getCustomerByPhone(phone));
        if (order.customerName) setValue('customerName', order.customerName);
        if (order.customerEmail) setValue('customerEmail', order.customerEmail);
        if (order.customerPhone) setValue('customerPhone', order.customerPhone);
    }, [dispatch, phone, order]);
    return (
        <div>
            <h3>Fill the Form</h3>
            <div className={'selector_wrapper'}>
                <form onSubmit={handleSubmit((data) => handleNextButton(data))}>
                    <Grid item xs={1} sm={1} paddingBottom={3}>
                        <TextField
                            inputProps={{ maxLength: 11 }}
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
                            {...register('customerPhone')}
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
                            {...register('customerName')}
                            error={!!errors.customerName}
                            helperText={errors?.customerName ? String(errors.customerName.message) : null}
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
                            {...register('customerEmail')}
                            error={!!errors.customerEmail}
                            helperText={errors?.customerEmail ? String(errors.customerEmail.message) : null}
                        />
                    </Grid>

                    <div className={'buttons_wrapper'}>
                        <div>
                            {
                                <Button variant={'contained'}
                                        onClick={() => dispatch(handleBack())}
                                        style={{ marginBottom: '20px', padding: '10px 15px' }}>
                                    <KeyboardArrowLeft/> Назад
                                </Button>
                            }
                        </div>
                        <div>
                            {
                                <Button variant={'contained'}
                                        type={'submit'}
                                        onClick={handleNextButton}
                                        style={{
                                            marginBottom: '20px',
                                            padding: '10px 15px'
                                        }}> Далее <KeyboardArrowRight/>
                                </Button>
                            }
                        </div>

                    </div>
                </form>

            </div>
        </div>
    );
};

export default CustomerForm;