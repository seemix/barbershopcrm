import React, { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { SchedulerHelpers } from '@aldabil/react-scheduler/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimeField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Button, DialogActions, TextField } from '@mui/material';
import { getServicesByBarber } from '../../../store/services';
import {
    createOrder,
    getOrdersForCalendar,
    resetState,
    setBarber, setComment,
    setDateTime,
    setEndTime
} from '../../../store/order';
import SelectService from './SelectService/SelectService';
import { getAdditionalsByBarberAndService } from '../../../store/additional';
import SelectAdditional from './SelectAdditional/SelectAdditional';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import SelectColor from './SelectColor/SelectColor';
import SelectUser from './SelectUser/SelectUser';
import NewUser from './NewUser/NewUser';

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
        start: String(scheduler.state.start.value),
        newUserForm: false
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
    const newForm = (action:boolean) => {
       setState({...state, newUserForm: action});
    }
    const changeComment = (e:any) => {
        dispatch(setComment(e.target.value));
    }
    const handleSubmit = () => {
        dispatch(setEndTime(dayjs(order.startTime).add(+order.duration, 'minutes').toJSON()));
       // console.log(order.endTime);
        dispatch(createOrder(order));
        dispatch(getOrdersForCalendar());
        scheduler.close();
    };
    const handleCancel = () => {
        dispatch(resetState());
        scheduler.close();
    }
    useEffect(() => {
        dispatch(getServicesByBarber(String(admin_id)));
        dispatch(setBarber(admin_id));
    }, [dispatch, admin_id]);
    console.log(order);
    useEffect(() => {
        const startTime = dayjs(start).toDate();
        const endTime = dayjs(startTime).add(duration, 'minutes').toDate();
        dispatch(setDateTime({ startTime, endTime }));
    }, [start, dispatch, duration]);
    useEffect(() => {
        if (barberId && serviceId) dispatch(getAdditionalsByBarberAndService({ barberId, serviceId }));
    }, [barberId, serviceId, dispatch]);

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-evenly' }}>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimeField
                                style={{ backgroundColor: '#fff', width: '200px' }}
                                label={'время визита'}
                                defaultValue={dayjs(start)}
                                ampm={false}
                                onChange={(e) => handleChange(String(e), 'start')}
                            />
                        </LocalizationProvider></div>
                    <div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}><AttachMoneyIcon/> {order.price}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTimeIcon/>&nbsp; {order.duration}</div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ boxSizing: 'border-box' }}>
                        <h5>Услуга</h5>
                        {
                            services.map(item => <SelectService _id={item._id} service={item.service} price={item.price}
                                                                duration={item.duration}/>)
                        }
                    </div>
                    <div>
                        <div style={{ boxSizing: 'border-box', width: '370px' }}>
                            <h5>Дополнительные услуги</h5>
                            {serviceId &&
                                additionals.map(item => <SelectAdditional _id={item._id} barber={item.barber}
                                                                          additional={item.additional}
                                                                          price={item.price} duration={item.duration}/>)
                            }
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between',gap: '15px' }}>
                    <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                        {!state.newUserForm &&
                            <div>
                                <div> <SelectUser/></div>
                                <div>{!state.newUserForm && <Button onClick={() => newForm(true)}><AddIcon/></Button>}
                                </div>
                            </div>}
                        <div>
                            {state.newUserForm && <Button onClick={() => newForm(false)}><ArrowBackIosNewIcon/></Button>}
                        </div>
                    </div>
                    {state.newUserForm && <div>
                        <NewUser/>
                    </div> }
                    <div>
                        <TextField variant={'outlined'}
                                   onChange={changeComment}
                                   style={{width: '240px'}}
                                   label={'комментарий к заказу'}
                        />
                    </div>
                    <div>Цвет:
                        <SelectColor/>
                    </div>
                </div>
                <div>
                    <DialogActions>
                        {serviceId && <Button onClick={handleSubmit} variant={'contained'}>ОК</Button> }
                        <Button onClick={handleCancel} variant={'contained'}>Отмена</Button>
                    </DialogActions>
                </div>
            </div>
        </div>
    )
        ;
};

export default OrderEditor;