import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import priceDurationValidator from '../../../../validators/price-duration.validator';
import { TextField } from '@mui/material';

const ServicePriceForm = () => {
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm({ resolver: joiResolver(priceDurationValidator) });
    const submitForm = () => {

    }

    return (
        <div className={'add_form_main'}>
            <h4>Добавить / редактировтаь услугу</h4>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className={'add_form_wrapper'}>
                    <div>
                        <input type={'hidden'}
                               {...register('barber')}
                             //  defaultValue={barberAddForUpdate?.barber}
                        />
                        <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            //defaultValue={barberAddForUpdate?.additional.name}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ServicePriceForm;