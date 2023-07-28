import React, { useEffect, useRef, useState } from 'react';
import { Scheduler } from '@aldabil/react-scheduler';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getAllBarbers } from '../../../store/barbers';
import { Button, CircularProgress } from '@mui/material';
import { ExtraComponents } from './ExtraComponents';
import { ru } from 'date-fns/locale';
import OrderEditor from './OrderEditor';
import { deleteOrderById, getOrdersForCalendar } from '../../../store/order';
import { SchedulerRef } from '@aldabil/react-scheduler/types';

const Calendar = () => {
    const calendarRef = useRef<SchedulerRef>(null);
    const dispatch = useAppDispatch();
    const { orders, status } = useAppSelector(state => state.orderStore);
    const { barbers } = useAppSelector(state => state.barberStore);
    const activeBarbers = barbers.filter(barber => barber.isActive);
    const [mode, setMode] = useState<"default" | "tabs">("default");
    const resources = activeBarbers.map(item => {
        return {
            admin_id: item._id,
            title: item.name,
            mobile: item.description,
            avatar: item.picture,
        };
    });
    console.log(orders);
    const handleDelete = (id: string | number): Promise<string | number | void> => {
        dispatch(deleteOrderById(id));
        return new Promise((res) => {
            dispatch(getOrdersForCalendar());
            calendarRef.current?.scheduler.handleState(orders, 'events');
            res('ok');
        });
    };

    useEffect(() => {
        dispatch(getAllBarbers());
        dispatch(getOrdersForCalendar());
    }, [dispatch]);
    useEffect(()=>{
        calendarRef.current?.scheduler.handleState(orders, 'events');
    },[calendarRef, orders])

    return (
        <div>
            <h2>Календарь</h2>
            <h2> {status === 'loading' && <CircularProgress/>}</h2>
            <div style={{ textAlign: 'center' }}>
                <span>Переключатель вида: </span>
                <div style={{ textAlign: "center" }}>
                    <span>Resource View Mode: </span>
                    <Button
                        color={mode === "default" ? "primary" : "inherit"}
                        variant={mode === "default" ? "contained" : "text"}
                        size="small"
                        onClick={() => {
                            setMode("default");
                            calendarRef.current?.scheduler?.handleState(
                                "default",
                                "resourceViewMode"
                            );
                        }}
                    >
                        Default
                    </Button>
                    <Button
                        color={mode === "tabs" ? "primary" : "inherit"}
                        variant={mode === "tabs" ? "contained" : "text"}
                        size="small"
                        onClick={() => {
                            setMode("tabs");
                            calendarRef.current?.scheduler?.handleState(
                                "tabs",
                                "resourceViewMode"
                            );
                        }}
                    >
                        Tabs
                    </Button>
                </div>
            </div>
            {(status === null || status === 'fulfilled')  &&
                <Scheduler
                    ref={calendarRef}
                    locale={ru}
                    events={orders}
                    hourFormat={'24'}
                    onDelete={handleDelete}
                    customEditor={(scheduler) => <OrderEditor scheduler={scheduler}/>}
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
                    week={{
                        weekDays: [0, 1, 2, 3, 4, 5, 6],
                        weekStartOn: 1,
                        startHour: 8,
                        endHour: 19,
                        step: 30,
                        navigation: true,
                        disableGoToDay: true
                    }}
                    resources={resources}
                    resourceViewMode={'tabs'}
                    resourceFields={{
                        idField: 'admin_id',
                        textField: 'title',
                        subTextField: 'mobile',
                        avatarField: 'avatar',
                        colorField: 'color'
                    }}
                    day={{ step: 60, startHour: 8, endHour: 20 }}
                    //eventRenderer={}
                    viewerExtraComponent={ExtraComponents}
                />
            }
        </div>
    );
};

export default Calendar;