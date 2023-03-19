import React from 'react';
import { Scheduler } from '@aldabil/react-scheduler';
import { EVENTS } from './data';

const Calendar = () => {
    return (
        <div>
            <h2>Calendar</h2>
            <Scheduler
                events={EVENTS}
                // day={step: 30}
                day={{step: 30, startHour: 8, endHour: 20}}
            />
        </div>
    );
};

export default Calendar;