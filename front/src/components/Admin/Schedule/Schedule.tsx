import { Scheduler } from '@aldabil/react-scheduler';
import React, { useEffect } from 'react';
import TempCom from './TempCom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getScheduleByBarber } from '../../../store/schedule';
import { EventActions, ProcessedEvent } from '@aldabil/react-scheduler/types';


const Schedule = () => {
    const dispatch = useAppDispatch();
    const { schedule, newId } = useAppSelector(state => state.scheduleStore);
    const { user } = useAppSelector(state => state.authStore);
    useEffect(() => {
        dispatch(getScheduleByBarber(user.barber));
    }, [dispatch, newId]);

    // @ts-ignore
    const result = schedule.map(item => {
        return {
            event_id: item.event_id,
            title: item.title,
            start: new Date(item.start),
            end: new Date(item.end),
            color: item.color || ''
        };
    });
    //  console.log(result);
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
                    console.log(result);
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
            {result[0] &&
                <Scheduler
                    customEditor={(scheduler) => <TempCom scheduler={scheduler}/>}
                    // loading={loading}
                    // getRemoteEvents={fetchRemote}
                    events={result}
                    viewerExtraComponent={(fields, event) => {
                        return (
                            <div>
                                <p>Useful to render custom fields...</p>
                                <p>Description: {event.days || 'Nothing...'}</p>
                            </div>
                        );
                    }}
                    //onConfirm={confirmFunc}
                    // schedule[1] && <Child events={kolya}/>
                    eventRenderer={(event) => {
                       // if (+event.event_id % 2 === 0) {
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        height: "100%",
                                     //   background: "#757575"
                                    }}
                                >
                                    <div
                                        style={{ height: 20, background: "#ffffffb5", color: "black" }}
                                    >
                                        {event.start.toLocaleTimeString("ru-RU", {
                                            timeStyle: "short"
                                        })}
                                    </div>
                                    {/*<div>{event.title}</div>*/}
                                    <div
                                        style={{ height: 20, background: "#ffffffb5", color: "black" }}
                                    >
                                        {event.end.toLocaleTimeString("ru-RU", { timeStyle: "short" })}
                                    </div>
                                </div>
                            );
                        //}
                       // return null;
                    }}
                />
            }
        </div>
    );
};

export default Schedule;