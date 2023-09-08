import React, { useEffect } from 'react';
import { Button, DialogActions, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';
import customerValidator from '../../../validators/customer.validator';
import { closeCustomerEditModal, createCustomer, updateCustomer } from '../../../store/customer';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

const CustomerFullForm = () => {
    const dispatch = useAppDispatch();
    const { customerForEdit } = useAppSelector(state => state.customersStore);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({ resolver: joiResolver(customerValidator) });

    useEffect(() => {
        if(customerForEdit) {
            setValue('name', customerForEdit.name);
            setValue('phone', customerForEdit.phone);
            setValue('email', customerForEdit.email);
            setValue('tag', customerForEdit.tag);
        }
    }, [customerForEdit]);

    const submitForm = (data: any) => {
        if(!customerForEdit){
            dispatch(createCustomer(data));
        } else {
            dispatch(updateCustomer({
                _id: customerForEdit._id,
                ...data
            }));
        }
    };
    return (
        <div style={{ padding: '20px' }}>
            <h4>Добавить / изменить клиента</h4>
            <form onSubmit={handleSubmit(submitForm)}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '30px',
                    flexDirection: 'column',
                    maxWidth: '260px'
                }}>
                    <TextField label={'имя/фамилия'}
                               {...register('name')}
                               error={!!errors.name}
                               helperText={errors?.name ? String(errors.name.message) : ''}
                    />
                    <TextField label={'номер телефона'}
                               {...register('phone')}
                               error={!!errors.phone}
                               helperText={errors?.phone ? String(errors.phone.message) : ''}
                    />
                    <TextField label={'email'}
                               {...register('email')}
                               error={!!errors.email}
                               helperText={errors?.email ? String(errors.email.message) : ''}
                    />
                    <TextField label={'tag'}
                               required={false}
                               {...register('tag')}
                    />
                </div>
                <DialogActions>
                    <Button onClick={() => dispatch(closeCustomerEditModal())}>Отмена</Button>
                    <Button type={'submit'}>сохранить</Button>
                </DialogActions>
            </form>
        </div>
    );
};

export default CustomerFullForm;