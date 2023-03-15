import { Scheduler, useScheduler } from '@aldabil/react-scheduler';
import React, { useEffect } from 'react';

import ScheduleEditor from './ScheduleEditor';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getScheduleByBarber } from '../../../store/schedule';


const Schedule = () => {
    const { setEvents } = useScheduler();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.authStore);
    const { result, status, trigger } = useAppSelector(state => state.scheduleStore);

    useEffect(() => {
        setEvents(result);
        dispatch(getScheduleByBarber(user.barber));
    }, [dispatch, trigger]);

    return (
        <div>
            <h2>РАСПИСАНИЕ</h2>
            {(status === null || status === 'fulfilled') &&
                <Scheduler
                    customEditor={(scheduler) => <ScheduleEditor scheduler={scheduler}/>}
                    events={result}
                    // getRemoteEvents={remote}
                    //onDelete={handleDelete}
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