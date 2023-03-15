import { Scheduler, useScheduler } from '@aldabil/react-scheduler';
import React, { useEffect } from 'react';
import { ProcessedEvent, SchedulerProps } from '@aldabil/react-scheduler/types';

import TempCom from './TempCom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getScheduleByBarber } from '../../../store/schedule';


const Schedule = () => {
    const { setEvents, events } = useScheduler();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.authStore);
    const { result, status, trigger } = useAppSelector(state => state.scheduleStore);
    // setEvents(result);

    useEffect(() => {
        setEvents(result);
        dispatch(getScheduleByBarber(user.barber));
    }, [dispatch, trigger]);


    const deleteF = async (): Promise<string | number | void> => {
        return new Promise((resolve, reject) => {
            resolve('ok');
        });
    };

    const remote = async (): Promise<ProcessedEvent[]> => {
        if (status === 'fulfilled') return result as ProcessedEvent[];
        return [];
    };


    const fetchRemote = async (): Promise<ProcessedEvent[]> => {
        // console.log({ query });
        /**Simulate fetchin remote data */
        return new Promise((res, rej) => {
            fetch('http://localhost:6000/schedule/63e7cfcf5f71d58ec927d84e').then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    rej(`HTTP error! status: ${response.status}`);
                }
            })
                .then(data => {
                    // @ts-ignore
                    const result = data.map(item => {
                        return {
                            event_id: item.event_id,
                            title: item.title,
                            start: new Date(item.start),
                            end: new Date(item.end),
                            color: item.color
                        };
                    });
                    res(result);
                })
                .catch(error => {
                    rej(`Fetch error: ${error}`);
                });
        });
    };

    return (
        <div>
            <h4>РАСПИСАНИЕ</h4>
            {status === null || status === 'fulfilled' &&
                <Scheduler
                    customEditor={(scheduler) => <TempCom scheduler={scheduler}/>}
                    //
                    //
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
                                    //   background: "#757575"
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