import { Scheduler, useScheduler } from '@aldabil/react-scheduler';
import React, { useEffect } from 'react';
import { ru } from 'date-fns/locale';

import ScheduleEditor from './ScheduleEditor';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { deleteSchedule, getAllSchedules } from '../../../store/schedule';
import { Button, CircularProgress } from '@mui/material';
import { CustomEventRenderer } from './CustomEventRenderer';
import { getAllBarbers } from '../../../store/barbers';

const Schedule = () => {
    const { setEvents, resourceViewMode, setResourceViewMode } = useScheduler();

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
        setEvents(result);
        dispatch(getAllBarbers());
    }, [dispatch, schedule]);

    const handleDelete = (id: string | number): Promise<string | number | void> => {
        dispatch(deleteSchedule(id));
        return new Promise((res) => {
            dispatch(getAllSchedules());
            setEvents(result);
            res('ok');
        });
    };

    return (
        <div>
            <h2>Расписание</h2>
            <h2> {status === 'loading' && <CircularProgress/>}</h2>
            <div style={{ textAlign: 'center' }}>
                <span>Переключатель вида: </span>
                <Button
                    color={resourceViewMode === 'default' ? 'primary' : 'inherit'}
                    variant={resourceViewMode === 'default' ? 'contained' : 'text'}
                    size="small"
                    onClick={() => setResourceViewMode('default')}
                >
                    Default
                </Button>
                <Button
                    color={resourceViewMode === 'tabs' ? 'primary' : 'inherit'}
                    variant={resourceViewMode === 'tabs' ? 'contained' : 'text'}
                    size="small"
                    onClick={() => setResourceViewMode('tabs')}
                >
                    Tabs
                </Button>
            </div>
            {(status === null || status === 'fulfilled') && resources[0] && result[0] &&
                <Scheduler
                    loading={loading}
                    renderDeps={result}
                    locale={ru}
                    hourFormat={'24'}
                    customEditor={(scheduler) => <ScheduleEditor scheduler={scheduler}/>}
                    week={{
                        weekDays: [0, 1, 2, 3, 4, 5, 6],
                        weekStartOn: 1,
                        startHour: 8,
                        endHour: 19,
                        step: 60,
                        navigation: true,
                        disableGoToDay: false
                    }}
                    events={result}
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
                />
            }
        </div>
    );
};
export default Schedule;