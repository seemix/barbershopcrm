import React, { useEffect, useState } from 'react';

import { SchedulerHelpers } from '@aldabil/react-scheduler/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimeField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Button,  DialogActions } from '@mui/material';
import { getServicesByBarber } from '../../../store/services';
import { setBarber, setDateTime } from '../../../store/order';
import SelectService from './SelectService/SelectService';
import { getAdditionalsByBarberAndService } from '../../../store/additional';
import SelectAdditional from './SelectAdditional/SelectAdditional';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SelectColor from './SelectColor/SelectColor';

interface CustomEditorProps {
    scheduler: SchedulerHelpers;
}

const OrderEditor = ({ scheduler }: CustomEditorProps) => {
    const event = scheduler.edited;
    const order = useAppSelector(state => state.orderStore);

    const { services } = useAppSelector(state => state.serviceStore);
    const { additionals } = useAppSelector(state1 => state1.additionalStore);
    const { duration, barberId, serviceId } = useAppSelector(state1 => state1.orderStore);
    const dispatch = useAppDispatch();
    const start = String(scheduler.state.start.value);
    const [state, setState] = useState({
        start: String(scheduler.state.start.value)
    });
    const admin_id = scheduler.state.admin_id.value;
    const handleChange = (value: any, name: string) => {
        setState((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    const handleSubmit = () => {

    };
    useEffect(() => {
        dispatch(getServicesByBarber(String(admin_id)));
        dispatch(setBarber(admin_id));
    }, [dispatch, admin_id]);
    console.log(order);
    useEffect(() => {
        const startTime = dayjs(start).toDate();
        const endTime = dayjs(startTime).add(duration, 'minutes').toDate();
        dispatch(setDateTime({ startTime, endTime }));
    }, [start]);
    useEffect(() => {
        if (barberId && serviceId) dispatch(getAdditionalsByBarberAndService({ barberId, serviceId }));
    }, [barberId, serviceId, dispatch]);

    return (
        <div style={{ padding: '20px', backgroundColor: '#fcf9f5' }}>
            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div><LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimeField
                            label={'start'}
                            defaultValue={dayjs(start)}
                            ampm={false}
                            //disabled
                            onChange={(e) => handleChange(String(e), 'start')}
                        />
                    </LocalizationProvider></div>
                    <div style={{ position: 'absolute', top: 20, right: 25 }}>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}><AttachMoneyIcon/> {order.price}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTimeIcon/>&nbsp; {order.duration}</div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div>
                        <h5>Услуга:</h5>
                        {
                            services.map(item => <SelectService _id={item._id} service={item.service} price={item.price}
                                                                duration={item.duration}/>)
                        }
                    </div>
                    <div>
                        <div>
                            <h5>Дополнительные услуги</h5>
                            {serviceId &&
                                additionals.map(item => <SelectAdditional _id={item._id} barber={item.barber}
                                                                          additional={item.additional}
                                                                          price={item.price} duration={item.duration}/>)
                            }
                        </div>
                    </div>

                </div>
                <div>
                    Цвет:
                    <SelectColor/>

                </div>
                <div>
                    <DialogActions>
                        <Button onClick={handleSubmit}>ОК</Button>
                        <Button onClick={scheduler.close}>Отмена</Button>
                    </DialogActions>
                </div>
            </div>
        </div>
    )
        ;
};

export default OrderEditor;