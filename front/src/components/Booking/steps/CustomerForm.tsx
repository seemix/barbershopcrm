import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, InputAdornment, TextField, Button } from '@mui/material';
import { AccountCircle, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { joiResolver } from '@hookform/resolvers/joi';

import { useTranslation } from 'react-i18next';
import customerValidator from '../../../validators/customer.validator';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setCustomer } from '../../../store/order';
import { getCustomerByPhone } from '../../../store/customer';
import { handleBack, handleNext } from '../../../store/stepper';

const CustomerForm = () => {
    const { t } = useTranslation();
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({ resolver: joiResolver(customerValidator) });
    const dispatch = useAppDispatch();
    const { customer, status } = useAppSelector(state => state.customersStore);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const myAnchor = document.getElementById('anchor');
        if (myAnchor) {
            const top = myAnchor.getBoundingClientRect().top + window.scrollY;
            // myAnchor.scrollIntoView({ behavior: 'smooth' });        }
            window.scrollTo({ top: top - 200, behavior: 'smooth' });
        }
    }, []);

    const customerPhone = watch('customerPhone');
    useEffect(() => {
        if (customerPhone?.length === 9) dispatch(getCustomerByPhone(customerPhone));
    }, [customerPhone]);
    const handleNextButton = (data: any) => {
        if (!customer) dispatch(setCustomer({
            email: data.customerEmail,
            name: data.customerName,
            phone: data.customerPhone
        }));
        dispatch(handleNext());
    };
    useEffect(() => {
        if (customer && customer._id && status === 'fulfilled') {
            setValue('customerName', customer.name);
            setValue('customerEmail', customer.email);
            setValue('customerPhone', customer.phone);
            dispatch(setCustomer({
                _id: customer._id,
                name: customer.name,
                phone: customer.phone,
                email: customer.email
            }))
        } else {
            setDisabled(false);
        }
    }, [customer]);

    return (
        <div id={'anchor'}>
            <h3>{t('Заполните форму')}</h3>
            <div className={'selector_wrapper'}>
                <form onSubmit={handleSubmit(handleNextButton)}>
                    <Grid item xs={1} sm={1} paddingBottom={3}>
                        <TextField
                            inputProps={{ maxLength: 10 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIphoneOutlinedIcon/>
                                    </InputAdornment>
                                ),
                                style: { fontSize: 25, backgroundColor: '#fff', width: '250px' }
                            }}
                            label={t('Номер телефона')}
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
                            label={t('Имя / Фамилия')}
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
                                style: { fontSize: 15, backgroundColor: '#fff', width: '250px' }
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
                                    <KeyboardArrowLeft/> {t('назад')}
                                </Button>
                            }
                        </div>
                        <div>
                            {
                                <Button variant={'contained'}
                                        type={'submit'}
                                        style={{
                                            marginBottom: '20px',
                                            padding: '10px 15px'
                                        }}> {t('далее')} <KeyboardArrowRight/>
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