import React, { useEffect } from 'react';
import { Scheduler, useScheduler } from '@aldabil/react-scheduler';
import { EVENTS } from './data';
import { CustomOrderRenderer } from './CustomOrderRenderer';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getAllBarbers } from '../../../store/barbers';
import { getOrdersForCalendar } from '../../../store/calendarOrder';
import { Button, CircularProgress } from '@mui/material';

const Calendar = () => {
    const { setEvents, resourceViewMode, setResourceViewMode } = useScheduler();
    const dispatch = useAppDispatch();
    const { orders, status } = useAppSelector(state => state.orderCalendarStore);
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
        dispatch(getAllBarbers());
        dispatch(getOrdersForCalendar());
        setEvents(orders);
    }, [dispatch]);

    console.log(orders);
    return (
        <div>
            <h2>Calendar</h2>
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
            {(status === null || status === 'fulfilled') && resources[0] && orders[0] &&
                <Scheduler
                    events={orders}
                    hourFormat={'24'}
                    week={{
                        weekDays: [0, 1, 2, 3, 4, 5, 6],
                        weekStartOn: 1,
                        startHour: 8,
                        endHour: 19,
                        step: 30,
                        navigation: true,
                        disableGoToDay: false
                    }}
                    resources={resources}
                    resourceViewMode={'tabs'}
                    resourceFields={{
                        idField: 'admin_id',
                        textField: 'title',
                        subTextField: 'mobile',
                        avatarField: 'avatar',
                        colorField: 'color'
                    }}
                    // day={step: 30}
                    day={{ step: 30, startHour: 8, endHour: 20 }}
                    eventRenderer={CustomOrderRenderer}
                />
            }
        </div>
    );
};

export default Calendar;