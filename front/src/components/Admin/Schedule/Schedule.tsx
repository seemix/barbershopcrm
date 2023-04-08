import { Scheduler } from '@aldabil/react-scheduler';
import React, { useEffect, useRef, useState } from 'react';
import { ru } from 'date-fns/locale';
import { SchedulerRef } from '@aldabil/react-scheduler/types';

import ScheduleEditor from './ScheduleEditor';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { deleteSchedule, getAllSchedules } from '../../../store/schedule';
import { Button, CircularProgress } from '@mui/material';
import { CustomEventRenderer } from './CustomEventRenderer';
import { getAllBarbers } from '../../../store/barbers';

const Schedule = () => {
    const calendarRef = useRef<SchedulerRef>(null);
    const dispatch = useAppDispatch();
    const { result, status, schedule, loading } = useAppSelector(state => state.scheduleStore);
    const { barbers } = useAppSelector(state => state.barberStore);
    const activeBarbers = barbers.filter(barber => barber.isActive);
    const resources = activeBarbers.map(item => {
        return {
            admin_id: item._id,
            title: item.name,
            mobile: item.description,
            avatar: item.picture,
        };
    });
    useEffect(() => {
        dispatch(getAllSchedules());
        dispatch(getAllBarbers());
        calendarRef.current?.scheduler?.handleState(result, 'events');
    }, [dispatch, schedule]);
    useEffect(() => {
        calendarRef.current?.scheduler?.handleState(
            result,
            'events'
        );
    }, [calendarRef.current]);
    const handleDelete = (id: string | number): Promise<string | number | void> => {
        return new Promise((res) => {
            dispatch(deleteSchedule(id));
            dispatch(getAllSchedules());
            res('ok');
        });
    };
    const [mode, setMode] = useState<'default' | 'tabs'>('default');
    return (
        <div>
            <h2>Расписание</h2>
            <h2> {status === 'loading' && <CircularProgress/>}</h2>
            <div style={{ textAlign: 'center' }}>
                <span> Переключатель вида: </span>
                <Button
                    color={mode === 'default' ? 'primary' : 'inherit'}
                    variant={mode === 'default' ? 'contained' : 'text'}
                    size="small"
                    onClick={() => {
                        setMode('default');
                        calendarRef.current?.scheduler?.handleState(
                            'default',
                            'resourceViewMode'
                        );
                    }}
                >
                    Default
                </Button>
                <Button
                    color={mode === 'tabs' ? 'primary' : 'inherit'}
                    variant={mode === 'tabs' ? 'contained' : 'text'}
                    size="small"
                    onClick={() => {
                        setMode('tabs');
                        calendarRef.current?.scheduler?.handleState(
                            'tabs',
                            'resourceViewMode'
                        );
                    }}
                >
                    Tabs
                </Button>
            </div>
            {resources[0] && result[0] &&
                <Scheduler
                    loading={loading}
                    locale={ru}
                    ref={calendarRef}
                    events={result}
                    hourFormat={'24'}
                    customEditor={(scheduler) => <ScheduleEditor scheduler={scheduler}/>}
                    day={{ startHour: 8, endHour: 19, step: 30, navigation: true }}
                    week={{
                        weekDays: [0, 1, 2, 3, 4, 5, 6],
                        weekStartOn: 1,
                        startHour: 8,
                        endHour: 19,
                        step: 60,
                        navigation: true,
                        disableGoToDay: false
                    }}
                    resources={resources}
                    resourceViewMode={'default'}
                    resourceFields={{
                        idField: 'admin_id',
                        textField: 'title',
                        subTextField: 'mobile',
                        avatarField: 'avatar',
                        colorField: 'color'
                    }}
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
                    onDelete={(id) => handleDelete(id)}
                    eventRenderer={CustomEventRenderer}
                    viewerExtraComponent={(fields, event) => {
                        return (
                            <div>
                                <p>Useful to render custom fields...</p>
                                <p>Description: {event.description || "Nothing..."}</p>
                            </div>
                        );
                    }}
                />
            }
        </div>
    );
};
export default Schedule;