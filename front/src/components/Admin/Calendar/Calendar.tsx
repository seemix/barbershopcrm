import React, { useEffect, useRef } from 'react';
import { Scheduler } from '@aldabil/react-scheduler';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getAllBarbers } from '../../../store/barbers';
import { Button, CircularProgress, Dialog } from '@mui/material';
import { ru } from 'date-fns/locale';
import {
    closeOrderEditModal,
    getOrdersForCalendar,
    openOrderEditModal,
    setOrderForEdit, updateDateTime
} from '../../../store/order';
import { ProcessedEvent, SchedulerRef } from '@aldabil/react-scheduler/types';
import OrderEditor from './OrderEditor/OrderEditor';
import { dayAsset, weekAsset, resourceFieldsAsset } from './assets';
import './Calendar.css';

const Calendar = () => {
    const calendarRef = useRef<SchedulerRef>(null);
    const dispatch = useAppDispatch();
    const { orders, status, orderEditModal } = useAppSelector(state => state.orderStore);
    const { barbers } = useAppSelector(state => state.barberStore);
    const activeBarbers = barbers.filter(barber => barber.isActive);
    // const [mode, setMode] = useState<'default' | 'tabs'>('default');
    // calendarRefC.current?.scheduler.handleState('default', 'resourceViewMode');

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
    // const handleDelete = (id: string | number): Promise<string | number | void> => {
    //     dispatch(deleteOrderById(String(id)));
    //     return new Promise((res) => {
    //         dispatch(getOrdersForCalendar());
    //         calendarRef.current?.scheduler.handleState(orders, 'events');
    //         res('ok');
    //     });
    // };

    useEffect(() => {
        dispatch(getAllBarbers());
        dispatch(getOrdersForCalendar());
    }, []);

    const handleEdit = (event: any) => {
        dispatch(setOrderForEdit(event));
        dispatch(openOrderEditModal(null));
    };

    const handleDrop = (date: Date, event1: ProcessedEvent) => {
        dispatch(updateDateTime({ _id: event1.event_id, startTime: event1.start, endTime: event1.end }));
        return event1;
    };
    return (
        <div>
            <h2> {status === 'loading' && <CircularProgress/>}</h2>
            {/*<div style={{ textAlign: 'center' }}>*/}
            {/*    <span>Переключатель вида: </span>*/}
            {/*    <div style={{ textAlign: 'center' }}>*/}
            {/*        <span>Resource View Mode: </span>*/}
            {/*        <Button*/}
            {/*            color={mode === 'default' ? 'primary' : 'inherit'}*/}
            {/*            variant={mode === 'default' ? 'contained' : 'text'}*/}
            {/*            size="small"*/}
            {/*            onClick={() => {*/}
            {/*                setMode('default');*/}
            {/*                calendarRefC.current?.scheduler?.handleState(*/}
            {/*                    'default',*/}
            {/*                    'resourceViewMode'*/}
            {/*                );*/}
            {/*                // calendarRefC.current?.scheduler.handleState('day', 'day')*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            Default*/}
            {/*        </Button>*/}
            {/*        <Button*/}
            {/*            color={mode === 'tabs' ? 'primary' : 'inherit'}*/}
            {/*            variant={mode === 'tabs' ? 'contained' : 'text'}*/}
            {/*            size="small"*/}
            {/*            onClick={() => {*/}
            {/*                setMode('tabs');*/}
            {/*                calendarRefC.current?.scheduler?.handleState(*/}
            {/*                    'tabs',*/}
            {/*                    'resourceViewMode'*/}
            {/*                );*/}
            {/*            }}*/}
            {/*        >Tabs*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div style={{ position: 'absolute', top: '62px', right: '50px', zIndex: '20' }}>
                <h3> период:
                    <Button onClick={() => {
                        calendarRef.current?.scheduler.handleState('day', 'view');
                        calendarRef.current?.scheduler.handleState('default', 'resourceViewMode');

                    }}>день</Button>
                    <Button onClick={() => {
                        calendarRef.current?.scheduler.handleState('tabs', 'resourceViewMode');
                        calendarRef.current?.scheduler.handleState('week', 'view');

                    }}>неделя</Button>
                </h3>
            </div>
            {(status === null || status === 'fulfilled') &&
                <Scheduler
                    ref={calendarRef}
                    locale={ru}
                    view={'day'}
                    events={orders}
                    hourFormat={'24'}
                    //onDelete={handleDelete}
                    // customEditor={(scheduler) => <OrderEditor scheduler={scheduler}/>}
                    fields={[
                        {
                            name: 'admin_id',
                            type: 'select',
                            default: resources[0].admin_id,
                            options: resources.map((res) => {
                                return {
                                    id: res.admin_id,
                                    text: `${res.title} (${res.mobile})`,
                                    value: res.admin_id //Should match "name" property
                                };
                            }),
                            config: { label: 'Assignee', required: true }
                        }
                    ]}
                    //@ts-ignore
                    week={{
                        ...weekAsset,
                        cellRenderer: ({ ...props }) => {
                            return (<Button
                                {...props}
                                onClick={() => dispatch(openOrderEditModal(props))}>
                            </Button>);
                        }
                    }}
                    resources={resources}
                    resourceViewMode={'default'}
                    resourceFields={resourceFieldsAsset}
                    //@ts-ignore
                    day={{
                        ...dayAsset, cellRenderer: ({ ...props }) => {
                            return (<Button
                                {...props}
                                onClick={() => dispatch(openOrderEditModal(props))}>
                            </Button>);
                        }
                    }}
                    eventRenderer={(props) => {
                        const { event } = props;
                        return (<div {...props}
                                     onClick={() => handleEdit(event)}
                                     style={{ backgroundColor: event.color }}
                                     className={'event_render_main'}>
                            <div
                                className={'event_render_time'}>{event.start.toLocaleTimeString('ru-RU', { timeStyle: 'short' })} - {event.end.toLocaleTimeString('ru-RU', { timeStyle: 'short' })}
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
            <Dialog open={orderEditModal} onClose={() => dispatch(closeOrderEditModal())} maxWidth={'md'}>
                <OrderEditor/>
            </Dialog>
        </div>
    );
};

export default Calendar;