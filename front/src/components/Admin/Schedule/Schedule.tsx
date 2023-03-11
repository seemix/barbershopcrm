import { Scheduler } from '@aldabil/react-scheduler';
import React, { useEffect } from 'react';
import TempCom from './TempCom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getScheduleByBarber } from '../../../store/schedule';
import { ProcessedEvent } from '@aldabil/react-scheduler/types';


const Schedule = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getScheduleByBarber('63e7cfcf5f71d58ec927d84e'));
    }, []);
    const { schedule } = useAppSelector(state => state.scheduleStore);
    // @ts-ignore
    const result = schedule.map(item => {
        return {
            event_id: item.event_id,
            title: item.title,
            start: new Date(item.start),
            end: new Date(item.end),
            color: item.color
        };
    });
    console.log(result);
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
            {result[0] &&
                <Scheduler
                    customEditor={TempCom}
                    // loading={loading}
                    // getRemoteEvents={fetchRemote}
                    events={result}
                    // schedule[1] && <Child events={kolya}/>
                />
            }
        </div>
    );
};

export default Schedule;