import { Scheduler, useScheduler } from '@aldabil/react-scheduler';
import React, { useEffect } from 'react';

import ScheduleEditor from './ScheduleEditor';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { deleteSchedule, getAllSchedules } from '../../../store/schedule';
import { Button, CircularProgress } from '@mui/material';
import CustomEventRenderer from './CustomEventRenderer';
import { getAllBarbers } from '../../../store/barbers';


const Schedule = () => {
    const { setEvents, resourceViewMode, setResourceViewMode } = useScheduler();

    const dispatch = useAppDispatch();
    const { result, status } = useAppSelector(state => state.scheduleStore);
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
        setEvents(result);
    }, [dispatch, result]);

    const handleDelete = (id: string | number): Promise<string | number | void> => {
        dispatch(deleteSchedule(id));
        return new Promise((res, rej) => {
            dispatch(getAllSchedules());
            setEvents(result);
            res('ok');
        });
    };

    return (
        <div>
            <h2>РАСПИСАНИЕ </h2>
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
                    customEditor={(scheduler) => <ScheduleEditor scheduler={scheduler}/>}
                    events={result}
                    resources={resources}
                    resourceViewMode={'tabs'}
                    resourceFields={{
                        idField: "admin_id",
                        textField: "title",
                        subTextField: "mobile",
                        avatarField: "avatar",
                        colorField: "color"
                    }}
                    fields={[
                        {
                            name: "admin_id",
                            type: "select",
                            default: resources[0].admin_id,
                            options: resources.map((res) => {
                                return {
                                    id: res.admin_id,
                                    text: `${res.title} (${res.mobile})`,
                                    value: res.admin_id //Should match "name" property
                                };
                            }),
                            config: { label: "Assignee", required: true }
                        }
                    ]}
                    // getRemoteEvents={remote}
                    onDelete={(id) => handleDelete(id)}
                    // viewerExtraComponent={(fields, event) => {
                    //     return (
                    //         <div>
                    //             <p>Useful to render custom fields...</p>
                    //             <p>Description: {event.days || 'Nothing...'}</p>
                    //         </div>
                    //     );
                    // }}
                    // onConfirm={}
                    eventRenderer={CustomEventRenderer}

                />
            }

        </div>
    );
};

export default Schedule;