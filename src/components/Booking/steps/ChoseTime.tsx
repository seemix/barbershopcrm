import React from 'react';
import { ScheduleMeeting } from 'react-schedule-meeting';
import { useAppSelector } from '../../../hooks/redux';

const ChoseTime = () => {
    const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
        return {
            id,
            startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
            endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
        };
    });
    const  order  = useAppSelector(state => state.orderStore);
    console.log(order.barberId);
    console.log(order.duration);

    return (
        <div>
            <ScheduleMeeting
                borderRadius={3}
                primaryColor="#9e8a78"
                eventDurationInMinutes={45}
                availableTimeslots={availableTimeslots}
                onStartTimeSelect={console.log}
                backgroundColor="white"
            />
        </div>
    );
};

export default ChoseTime;