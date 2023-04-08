import React from 'react';
import { IBarberService } from '../../../interfaces/barber-service.model';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';

const SingleBarberPrice = (item: IBarberService) => {
    const { handleSubmit, register } = useForm();
    const submit = (data: any) => {
        console.log(data);
    };

    return (
        <div>
            <h3>{item.barber.name}</h3>
            <form onSubmit={handleSubmit(submit)}>
                {
                    item.services.map((service) =>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '20px' }}>
                            <div style={{ width: '300px' }}>{service.name}</div>
                            <div><TextField className={'short_text_field'} label={'время'}
                                            {...register('duration')}
                                defaultValue={service.duration}
                            />
                            </div>
                            <div><TextField className={'short_text_field'} label={'цена'}
                                            {...register('price')} /></div>
                        </div>
                    )
                }
                <Button type={'submit'}>Sub</Button>
            </form>
        </div>
    );
};

export default SingleBarberPrice;