import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import priceDurationValidator from '../../../../validators/price-duration.validator';
import { Checkbox, DialogActions, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { closeBarberServiceModal, resetBarberServiceForEdit } from '../../../../store/barberService';
import { useParams } from 'react-router-dom';

const ServicePriceForm = () => {
    const { barberId } = useParams();
    const dispatch = useAppDispatch();
    const { barberServiceForEdit } = useAppSelector(state => state.barberServiceStore);
    const { barberAdditionals } = useAppSelector(state => state.barberAdditionalStore);
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm({ resolver: joiResolver(priceDurationValidator) });


    const submitForm = (data: any) => {
        data.additionals = additionals;
        console.log(data);
    };
    const handleCancel = () => {
        dispatch(closeBarberServiceModal());
        dispatch(resetBarberServiceForEdit());
    };
    useEffect(() => {
        setValue('price', barberServiceForEdit?.price);
        setValue('duration', barberServiceForEdit?.duration);
    }, [barberServiceForEdit]);

    const init = barberServiceForEdit?.additionals.map(add => add.additional._id);
    const [additionals, setAdditionals] = useState<String[]>(init || []);
    // console.log(additionals);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            setAdditionals(additionals.filter(item => item !== e.target.name));
        } else {
            setAdditionals([...additionals, e.target.name]);
        }
    };
    return (
        <div className={'add_form_main'}>
            <h4>Добавить / редактировтаь услугу</h4>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className={'add_form_wrapper'}>
                    <div>
                        <input type={'hidden'}
                               {...register('barber')}
                               defaultValue={barberId}

                        />
                        <input type={'hidden'}
                               {...register('_id')}
                               defaultValue={barberServiceForEdit?._id}
                        />
                        <TextField
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            defaultValue={barberServiceForEdit?.service.name}
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
                    <div>
                        {barberAdditionals.map(item => <div key={item._id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            gap: '0px'
                        }}>
                            <div>{item.additional.name}</div>
                            <div>
                                <Checkbox
                                    onChange={handleChange}
                                    name={item.additional._id}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    defaultChecked={barberServiceForEdit?.additionals.some(item1 => item1.additional._id === item.additional._id)}
                                />
                            </div>
                        </div>)}
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

export default ServicePriceForm;