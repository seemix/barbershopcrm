import React, { useEffect } from 'react';
import { DialogActions, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { joiResolver } from '@hookform/resolvers/joi';

import {
    closeBarberAddModal, createBarberAdditional,
    resetCreateBarberAdd,
    setBarberAddForUpdate,
    updateBarberAdditional
} from '../../../../store/barberAdditional';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import './AdditionalPriceForm.css';
import priceDurationValidator from '../../../../validators/price-duration.validator';

const AdditionalPriceForm = () => {
       const handleCancel = () => {
        dispatch(closeBarberAddModal());
        dispatch(setBarberAddForUpdate(null));
        dispatch(resetCreateBarberAdd());
    };

    const dispatch = useAppDispatch();
    const { barberAddForUpdate, createAdd } = useAppSelector(state => state.barberAdditionalStore);

    const submitForm = (data: any) => {
        if (createAdd) {
            dispatch(createBarberAdditional(data));
        } else {
            dispatch(updateBarberAdditional(data));
        }
    };
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm({ resolver: joiResolver(priceDurationValidator) });

    useEffect(() => {
        setValue('price', barberAddForUpdate?.price);
        setValue('duration', barberAddForUpdate?.duration);
    }, [barberAddForUpdate]);

    return (
        <div className={'add_form_main'}>
            <h4>Добавить / редактировать доп. услугу</h4>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className={'add_form_wrapper'}>
                    <div>
                        <input type={'hidden'}
                               {...register('barber')}
                               defaultValue={barberAddForUpdate?.barber}
                        />
                        {barberAddForUpdate?._id &&
                            <input type={'hidden'}
                                   {...register('_id')}
                                   defaultValue={barberAddForUpdate?._id}
                            />
                        }

                        <input type={'hidden'}
                               {...register('additional')}
                               defaultValue={barberAddForUpdate?.additional._id}
                        />

                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            defaultValue={barberAddForUpdate?.additional.name}
                        />
                    </div>
                    <div className={'add_form_price_wrap'}>
                        <TextField
                            {...register('duration')}
                            label={'duration'}
                            className={'small_text_field'}
                            error={!!errors.duration}
                            //@ts-ignore
                            helperText={errors?.duration ? errors.duration.message : null}
                        />
                        <TextField
                            {...register('price')}
                            label={'price'}
                            className={'small_text_field'}
                            error={!!errors.price}
                            //@ts-ignore
                            helperText={errors?.price ? errors.price.message : null}
                        />
                    </div>
                </div>
                <DialogActions>
                    <Button onClick={handleCancel}>Отмена</Button>
                    <Button type={'submit'}>ОК</Button>
                </DialogActions>

            </form>
        </div>
    );
};

export default AdditionalPriceForm;