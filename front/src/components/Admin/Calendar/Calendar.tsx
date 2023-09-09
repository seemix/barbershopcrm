import React, { useEffect, useRef, useState } from 'react';
import { Scheduler } from '@aldabil/react-scheduler';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getAllBarbers } from '../../../store/barbers';
import { Button, Dialog } from '@mui/material';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { ru } from 'date-fns/locale';
import {
    closeOrderEditModal,
    getOrdersForCalendar,
    openOrderEditModal, resetState,
    setOrderForEdit, updateDateTime
} from '../../../store/order';
import { ProcessedEvent, SchedulerRef } from '@aldabil/react-scheduler/types';
import OrderEditor from './OrderEditor/OrderEditor';
import { dayAsset, weekAsset, resourceFieldsAsset } from './calendarAssets';
import './Calendar.css';
import CellRenderer from './CellRenderer';

const Calendar = () => {
    const calendarRef = useRef<SchedulerRef>(null);
    const dispatch = useAppDispatch();
    const { orders, status, orderEditModal } = useAppSelector(state => state.orderStore);
    const { barbers } = useAppSelector(state => state.barberStore);
    const activeBarbers = barbers.filter(barber => barber.isActive);

    useEffect(() => {
        calendarRef.current?.scheduler.handleState(orders, 'events');
    }, [calendarRef, orders]);

    const resources = activeBarbers.map(item => {
        return {
            admin_id: item._id,
            title: item.name,
            mobile: item.description,
            avatar: item.picture,
        };
    });

    type ITiming = 15 | 30 | 60;
    type IView = 'day' | 'week';
    const [timing, setTiming] = useState<ITiming>(30);
    const [view, setView] = useState<IView>('day');

    useEffect(() => {
        dispatch(getAllBarbers());
        dispatch(getOrdersForCalendar());
    }, []);
    //
    useEffect(() => {
        const commonProperties = {
            ...weekAsset,
            step: timing,
            cellRenderer: ({ ...props }) => <CellRenderer {...props}/>
        };
        ['week', 'day'].forEach((view) => {
            //@ts-ignore
            calendarRef.current?.scheduler.handleState(commonProperties, view);
        });
    }, [timing]);

    useEffect(() => {
        if (view === 'day') {
            calendarRef.current?.scheduler.handleState('day', 'view');
            calendarRef.current?.scheduler.handleState('default', 'resourceViewMode');
        } else if (view === 'week') {
            calendarRef.current?.scheduler.handleState('week', 'view');
            calendarRef.current?.scheduler.handleState('tabs', 'resourceViewMode');
        }
    }, [view]);
    const handleEdit = (event: any) => {
        dispatch(setOrderForEdit(event));
        dispatch(openOrderEditModal(null));
    };
    const handleDrop = (date: Date, event1: ProcessedEvent) => {
        dispatch(updateDateTime({ _id: event1.event_id, startTime: event1.start, endTime: event1.end }));
        return event1;
    };
    return (
        <div style={{ marginTop: '10px' }}>
            <div className={'view_buttons_wrapper'}>
                <div>период:</div>
                <div><Button variant={view === 'day' ? 'contained' : 'text'}
                             onClick={() => setView('day')}>день</Button>
                    <Button variant={view === 'week' ? 'contained' : 'text'}
                            onClick={() => setView('week')}>неделя</Button></div>

                <div>интервал:</div>
                <div><Button variant={timing === 15 ? 'contained' : 'text'}
                             onClick={() => setTiming(15)}>15min</Button>
                    <Button variant={timing === 30 ? 'contained' : 'text'}
                            onClick={() => setTiming(30)}>30 min</Button>
                    <Button variant={timing === 60 ? 'contained' : 'text'}
                            onClick={() => setTiming(60)}>60 min</Button>
                </div>
            </div>
            {(status === null || status === 'fulfilled') &&
                <Scheduler
                    ref={calendarRef}
                    locale={ru}
                    view={'day'}
                    events={orders}
                    hourFormat={'24'}
                    //@ts-ignore
                    week={{
                        ...weekAsset,
                        cellRenderer: ({ ...props }) => <CellRenderer {...props}/>
                    }}
                    resources={resources}
                    resourceViewMode={'default'}
                    resourceFields={resourceFieldsAsset}
                    //@ts-ignore
                    day={{
                        ...dayAsset, cellRenderer: ({ ...props }) => <CellRenderer {...props}/>
                    }}
                    eventRenderer={(props) => {
                        const { event } = props;
                        return (<div {...props}
                                     onClick={() => handleEdit(event)}
                                     style={{ backgroundColor: event.color }}
                                     className={'event_render_main'}>
                            <div
                                className={'event_render_time'}>

                                {event.start.toLocaleTimeString('ru-RU', { timeStyle: 'short' })} -
                                {event.end.toLocaleTimeString('ru-RU', { timeStyle: 'short' })}
                                {event?.completed && <PriceCheckIcon className={'event_render_payed'}/>}
                            </div>
                            <div className={'event_render_wrap'}>
                                <div>✂️ {event.title}</div>
                                <div> 🧔 {event.customer} ☎️ {event.phone} </div>
                                <div><i><small>{event?.comment} </small></i></div>
                            </div>
                        </div>);
                    }}
                    //@ts-ignore
                    onEventDrop={(date, event1) => handleDrop(date, event1)}
                    disableViewNavigator={true}
                />
            }
            <Dialog open={orderEditModal} onClose={() => {
                dispatch(closeOrderEditModal());
                dispatch(resetState());
            }} maxWidth={'md'}>
                <OrderEditor/>
            </Dialog>
        </div>
    );
};

export default Calendar;