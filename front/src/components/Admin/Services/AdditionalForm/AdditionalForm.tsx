import React, { useEffect } from 'react';
import { Button, DialogActions, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { closeAddDialog, createAdditional, setAddForUpdate, updateAdditional } from '../../../../store/additional';

const AdditionalForm = () => {
    type FormData = {
        _id?: string;
        name: string;
    }
    const dispatch = useAppDispatch();
    const { additionalToUpdate } = useAppSelector(state => state.additionalStore);
    const { handleSubmit, register, setValue } = useForm<FormData>();
    useEffect(() => {
        if (additionalToUpdate._id) {
            setValue('_id', additionalToUpdate._id);
            setValue('name', additionalToUpdate.name);
        }
    }, []);

    const submit = (data: FormData) => {
        if (additionalToUpdate._id) {
            dispatch(setAddForUpdate(data));
            dispatch(updateAdditional(data));
        } else {
            dispatch(createAdditional(data));
        }
    };
    return (
        <>
            <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px', width: '350px' }}>
                <h3>Добавить/изменить доп. услугу</h3>
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
                            label={'Дополнительная услуга'}
                            margin={'normal'}
                            {...register('name')}
                        />
                    </div>
                    <DialogActions>
                        <Button onClick={() => dispatch(closeAddDialog())}>Отмена</Button>
                        <Button type={'submit'}>OK</Button>
                    </DialogActions>
                </form>
            </div>
        </>
    );
};

export default AdditionalForm;