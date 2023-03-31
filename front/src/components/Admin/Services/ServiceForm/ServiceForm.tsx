import React, { useEffect } from 'react';
import { Button, DialogActions, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { closeDialog, createService, setServiceForUpdate, updateService } from '../../../../store/services';

const ServiceForm = () => {
    type FormData = {
        _id?: string;
        name: string;
        description: string;
    }
    const dispatch = useAppDispatch();
    const { serviceToUpdate } = useAppSelector(state => state.serviceStore);
    const { handleSubmit, register, setValue } = useForm<FormData>();
    useEffect(() => {
        if (serviceToUpdate._id) {
            setValue('_id', serviceToUpdate._id);
            setValue('name', serviceToUpdate.name);
            setValue('description', serviceToUpdate.description);
        }
    }, []);

    const submit = (data: FormData) => {
        if (serviceToUpdate._id) {
            dispatch(setServiceForUpdate(data));
            dispatch(updateService(data));
        } else {
            dispatch(createService(data));
        }
    };
    return (
        <>
            <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px', width: '350px' }}>
                <h3>Добавить/изменить услугу</h3>
                <form onSubmit={handleSubmit(submit)}>
                    <div style={{ display: 'none' }}>
                        <TextField
                            type={'hidden'}
                            {...register('_id')}
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            label={'услуга'}
                            margin={'normal'}
                            {...register('name')}
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            margin={'normal'}
                            label={'описание'}
                            {...register('description')}
                        />
                    </div>
                    <DialogActions>
                        <Button onClick={() => dispatch(closeDialog())}>Cancel</Button>
                        <Button type={'submit'}>OK</Button>
                    </DialogActions>
                </form>
            </div>
        </>
    );
};

export default ServiceForm;