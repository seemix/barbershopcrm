import React, { useEffect } from 'react';
import { Scheduler, useScheduler } from '@aldabil/react-scheduler';
import { CustomOrderRenderer } from './CustomOrderRenderer';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getAllBarbers } from '../../../store/barbers';
import { getOrdersForCalendar } from '../../../store/calendarOrder';
import { Button, CircularProgress } from '@mui/material';
import { ExtraComponents } from './ExtraComponents';
import { ru } from 'date-fns/locale';
import OrderEditor from './OrderEditor';

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

 //   console.log(orders);
    return (
        <div>
            <h2>Календарь</h2>
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
                    locale={ru}
                    events={orders}
                    hourFormat={'24'}
                    customEditor={(scheduler) => <OrderEditor scheduler={scheduler}/>}
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
                    viewerExtraComponent={ExtraComponents}
                />
            }
        </div>
    );
};

export default Calendar;