import { Scheduler, useScheduler } from '@aldabil/react-scheduler';
import React, { useEffect } from 'react';

import ScheduleEditor from './ScheduleEditor';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { deleteSchedule, getScheduleByBarber } from '../../../store/schedule';
import { CircularProgress } from '@mui/material';


const Schedule = () => {
    const { setEvents } = useScheduler();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.authStore);
    const { result, status } = useAppSelector(state => state.scheduleStore);

    useEffect(() => {
        setEvents(result);
        dispatch(getScheduleByBarber(user.barber));
    }, [dispatch]);

    const handleDelete = (id:string | number): Promise<string | number | void> => {
        dispatch(deleteSchedule(id));
        return new Promise((res, rej) => {
            dispatch(getScheduleByBarber(user.barber));
            setEvents(result);
            res('ok');
        });
    }

    return (
        <div>
            <h2>РАСПИСАНИЕ </h2>
            <h2> {status === 'loading' && <CircularProgress/>}</h2>
            {(status === null || status === 'fulfilled') &&
                <Scheduler
                    customEditor={(scheduler) => <ScheduleEditor scheduler={scheduler}/>}
                    events={result}
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
                    eventRenderer={(event) => {
                        return (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                }}
                            >
                                <div
                                    style={{ height: 20, background: '#ffffffb5', color: 'black' }}
                                >
                                    {event.start.toLocaleTimeString('ru-RU', {
                                        timeStyle: 'short'
                                    })}
                                </div>
                                <div
                                    style={{ height: 20, background: '#ffffffb5', color: 'black' }}
                                >
                                    {event.end.toLocaleTimeString('ru-RU', { timeStyle: 'short' })}
                                </div>
                            </div>
                        );
                    }}
                />
            }
        </div>
    );
};

export default Schedule;