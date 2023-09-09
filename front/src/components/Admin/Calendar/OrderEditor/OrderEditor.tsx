import React, { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimeField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {
    Backdrop,
    Button,
    Checkbox, CircularProgress,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup, Switch,
    TextField
} from '@mui/material';
import { getServicesByBarber } from '../../../../store/services';
import {
    addAdditional,
    changePayed,
    closeOrderEditModal,
    createOrder, deleteOrderById,
    removeAdditional, resetAdditionals,
    resetState,
    setBarber, setComment,
    setCompletedOrder,
    setDateTime,
    setService, setUncompletedOrder, updateOrderById
} from '../../../../store/order';
import { getAdditionalsByBarberAndService } from '../../../../store/additional';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import SelectColor from '../SelectColor/SelectColor';
import SelectUser from '../SelectUser/SelectUser';
import NewUser from '../NewUser/NewUser';
import './OrderEditor.css';
import { OrderDto } from '../../../../dtos/order.dto';


const OrderEditor = () => {
    const order = useAppSelector(state => state.orderStore);
    const { barbers } = useAppSelector(state => state.barberStore);
    const { services, status } = useAppSelector(state => state.serviceStore);
    const { additionals } = useAppSelector(state => state.additionalStore);
    const add = useAppSelector(state => state.additionalStore);
    const { duration, barberId, serviceId } = useAppSelector(state => state.orderStore);
    const dispatch = useAppDispatch();
    const [state, setState] = useState({
        start: order.startTime,
        newUserForm: false
    });
    const handleChange = (value: any, name: string) => {
        setState((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    const newForm = (action: boolean) => {
        setState({ ...state, newUserForm: action });
    };
    const changeComment = (e: any) => {
        dispatch(setComment(e.target.value));
    };
    const changePayedSum = (e: any) => {
        dispatch(changePayed(e.target.value));
    }
    const [deleteOrder, setDeleteOrder] = useState(false);
    const handleDelete = () => {
        dispatch(closeOrderEditModal());
        dispatch(deleteOrderById(String(order.orderId)));
        dispatch(resetState());
    };
    const handleSubmit = async () => {
        if (order.orderId) {
            const orderToUpdate = new OrderDto(order);
            orderToUpdate.orderId = order.orderId;
            // @ts-ignore
            await dispatch(updateOrderById(orderToUpdate));
        } else {
            const orderToCreate = new OrderDto(order);
            // @ts-ignore
            await dispatch(createOrder(orderToCreate));
        }
        dispatch(resetState());
    };
    const handleCancel = () => {
        dispatch(closeOrderEditModal());
        dispatch(resetState());
    };

    useEffect(() => {
        dispatch(getServicesByBarber(String(barberId)));
        dispatch(setBarber(barberId));
    }, [dispatch]);

    useEffect(() => {
        const startTime = dayjs(state.start).toJSON();
        const endTime = dayjs(startTime).add(duration, 'minutes').toJSON();
        dispatch(setDateTime({ startTime, endTime }));
    }, [state.start, dispatch, duration]);

    useEffect(() => {
        if (barberId && serviceId) dispatch(getAdditionalsByBarberAndService({ barberId, serviceId }));
    }, [barberId, serviceId, dispatch]);

    const selectService = (e: React.ChangeEvent<HTMLInputElement>) => {
        const index = services.findIndex(service => service.service._id === e.target.value);
        dispatch(setService({
            serviceId: e.target.value,
            duration: services[index].duration,
            price: services[index].price
        }));
        dispatch(resetAdditionals());
    };

    const selectAdditional = (e: React.ChangeEvent<HTMLInputElement>) => {
        const index = additionals.findIndex(add => add._id === e.target.value);
        const objToUpdate = {
            _id: e.target.value,
            price: additionals[index].price,
            duration: additionals[index].duration
        };
        if (e.target.checked) {
            dispatch(addAdditional(objToUpdate));
        } else {
            dispatch(removeAdditional(objToUpdate));
        }
    };
    return (
        <div className={'order_editor_wrapper'}>
            <Backdrop style={{ zIndex: '10' }}
                      open={status === 'loading' || add.status === 'loading'}><CircularProgress/></Backdrop>
            <div className={'oe_second_wrapper'}>
                <div className={'oe_third_wrapper'}>
                    <h4>{barbers?.filter(barber => barber._id === barberId)[0]?.name}</h4>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimeField
                                className={'date_field'}
                                label={'время визита'}
                                defaultValue={dayjs(order.startTime)}
                                ampm={false}
                                onChange={(e) => handleChange(String(e), 'start')}
                            />
                        </LocalizationProvider>
                    </div>
                    <div>
                        <div className={'oe_time_price_wrap'}>
                            <div className={'oe_time_price'}><AttachMoneyIcon/> {order?.price}
                            </div>
                            <div className={'oe_time_price'}>
                                <AccessTimeIcon/>&nbsp; {order?.duration}</div>
                        </div>
                    </div>
                </div>

                <div className={'oe_services_wrapper'}>
                    <div style={{ boxSizing: 'border-box' }}>
                        <h5>Услуга</h5>
                        {services &&
                            <>
                                <FormControl>
                                    <RadioGroup value={order.serviceId} onChange={selectService}>
                                        {services.map(service => <FormControlLabel key={service._id}
                                                                                   value={service.service._id}
                                                                                   control={<Radio/>}
                                                                                   label={service.service.name + ' (' + service.price + ' MDL)'}/>)}
                                    </RadioGroup>
                                </FormControl>
                            </>
                        }
                    </div>
                    <div>
                        <div style={{ boxSizing: 'border-box', width: '370px' }}>
                            <h5>Дополнительные услуги</h5>
                            {serviceId && additionals &&
                                <>

                                    {additionals.map(add => <FormControlLabel key={add._id} control={<Checkbox
                                        value={add._id}
                                        checked={order.additionalServices.includes(add._id)}
                                        onChange={selectAdditional}
                                        inputProps={{ 'aria-label': 'controlled' }}/>}
                                                                              label={add.name + ' (' + add.price + ' MDL)'}/>)}
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className={'oe_user_wrapper'}>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        {!state.newUserForm &&
                            <div>
                                <div><SelectUser/></div>
                                <div>{!state.newUserForm && <Button onClick={() => newForm(true)}><AddIcon/></Button>}
                                </div>
                            </div>}
                        <div>
                            {state.newUserForm &&
                                <Button onClick={() => newForm(false)}><ArrowBackIosNewIcon/></Button>}
                        </div>
                    </div>
                    {state.newUserForm && <div>
                        <NewUser/>
                    </div>}
                    <div>
                        {
                            <TextField variant={'outlined'}
                                       onChange={changeComment}
                                       style={{ width: '240px' }}
                                       defaultValue={order?.comment}
                                       label={'комментарий к заказу'}
                            />}
                    </div>
                    <div>Цвет:
                        <SelectColor/>
                    </div>
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>{!deleteOrder && order.orderId &&
                            <Button onClick={() => setDeleteOrder(true)}>Отменить запись</Button>}
                            {deleteOrder && <>
                                <Button onClick={() => setDeleteOrder(false)}>не отменять</Button>
                                <Button onClick={handleDelete}>отменить</Button>
                            </>}
                        </div>

                        {order.orderId &&
                            <div>
                                <Switch
                                    checked={order.completed}
                                    onChange={(event, checked) => {
                                        if (checked) {
                                            dispatch(setCompletedOrder());
                                        } else {
                                            dispatch(setUncompletedOrder());
                                        }
                                    }}/>
                                {order.completed &&
                                    <TextField label={'оплачено'} style={{ width: '80px' }} size={'small'}
                                               onChange={changePayedSum}
                                               inputProps={{
                                                   inputMode: 'numeric',
                                                   pattern: '[0-9]*', // This also helps with mobile keyboard input
                                               }}
                                               defaultValue={order.payed || order.price}/>
                                }
                            </div>
                        }

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Button onClick={handleCancel} variant={'contained'}>Отмена</Button>
                            {serviceId && <Button onClick={handleSubmit} variant={'contained'}>ОК</Button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderEditor;