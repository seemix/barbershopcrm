import { Fragment, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
import { EventRendererProps, SchedulerRef } from '@aldabil/react-scheduler/types';


function Customers() {

    const EVENTS0 = [
        {
            event_id: 1,
            title: 'Event 1',
            start: new Date(new Date(new Date().setHours(9)).setMinutes(30)),
            end: new Date(new Date(new Date().setHours(10)).setMinutes(30)),
            admin_id: 1
        },
        {
            event_id: 2,
            title: 'Event 2',
            start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
            end: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
            admin_id: 2
        }

    ];
    const EVENTS = [
        {
            event_id: 1,
            title: 'Event 1',
            start: new Date(new Date(new Date().setHours(9)).setMinutes(30)),
            end: new Date(new Date(new Date().setHours(10)).setMinutes(30)),
            admin_id: 1
        },
        {
            event_id: 2,
            title: 'Event 2',
            start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
            end: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
            admin_id: 2
        },
        {
            event_id: 3,
            title: 'Event 3',
            start: new Date(
                new Date(new Date(new Date().setHours(9)).setMinutes(0)).setDate(
                    new Date().getDate() - 1
                )
            ),
            end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
            admin_id: 1
        },
        {
            event_id: 4,
            title: 'Event 4',
            start: new Date(
                new Date(new Date(new Date().setHours(9)).setMinutes(0)).setDate(
                    new Date().getDate() - 2
                )
            ),
            end: new Date(
                new Date(new Date(new Date().setHours(10)).setMinutes(0)).setDate(
                    new Date().getDate() - 2
                )
            ),
            admin_id: 2
        },
        {
            event_id: 5,
            title: 'Event 5',
            start: new Date(
                new Date(new Date(new Date().setHours(10)).setMinutes(0)).setDate(
                    new Date().getDate() - 2
                )
            ),
            end: new Date(
                new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
                    new Date().getDate() + 10
                )
            ),
            admin_id: 4
        },
        {
            event_id: 6,
            title: 'Event 6',
            start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
            end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
            admin_id: 2
        },
        {
            event_id: 7,
            title: 'Event 7',
            start: new Date(
                new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
                    new Date().getDate() - 1
                )
            ),
            end: new Date(
                new Date(new Date(new Date().setHours(12)).setMinutes(0)).setDate(
                    new Date().getDate() - 1
                )
            ),
            admin_id: 3
        },
        {
            event_id: 8,
            title: 'Event 8',
            start: new Date(
                new Date(new Date(new Date().setHours(13)).setMinutes(0)).setDate(
                    new Date().getDate() - 1
                )
            ),
            end: new Date(
                new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(
                    new Date().getDate() - 1
                )
            ),
            admin_id: 4
        },
        {
            event_id: 9,
            title: 'Event 11',
            start: new Date(
                new Date(new Date(new Date().setHours(13)).setMinutes(0)).setDate(
                    new Date().getDate() + 1
                )
            ),
            end: new Date(
                new Date(new Date(new Date().setHours(15)).setMinutes(30)).setDate(
                    new Date().getDate() + 1
                )
            ),
            admin_id: 1
        },
        {
            event_id: 10,
            title: 'Event 9',
            start: new Date(
                new Date(new Date(new Date().setHours(15)).setMinutes(0)).setDate(
                    new Date().getDate() + 1
                )
            ),
            end: new Date(
                new Date(new Date(new Date().setHours(16)).setMinutes(30)).setDate(
                    new Date().getDate() + 1
                )
            ),
            admin_id: 2
        },
        {
            event_id: 11,
            title: 'Event 10',
            start: new Date(
                new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
                    new Date().getDate() - 1
                )
            ),
            end: new Date(
                new Date(new Date(new Date().setHours(15)).setMinutes(0)).setDate(
                    new Date().getDate() - 1
                )
            ),
            admin_id: 1
        }
    ];

    const RESOURCES = [
        {
            admin_id: 1,
            title: 'John',
            mobile: '555666777',
            avatar: 'https://picsum.photos/200/300',
            color: '#ab2d2d'
        },
        {
            admin_id: 2,
            title: 'Sarah',
            mobile: '545678354',
            avatar: 'https://picsum.photos/200/300',
            color: '#58ab2d'
        },
        {
            admin_id: 3,
            title: 'Joseph',
            mobile: '543678433',
            avatar: 'https://picsum.photos/200/300',
            color: '#a001a2'
        },
        {
            admin_id: 4,
            title: 'Mera',
            mobile: '507487620',
            avatar: 'https://picsum.photos/200/300',
            color: '#08c5bd'
        }
    ];
    const changeEv = () => {
        calendarRef.current?.scheduler.handleState(EVENTS0, 'events');
    };
    const moreEv = () => {
        calendarRef.current?.scheduler.handleState(EVENTS, 'events');
    };

    const [mode, setMode] = useState<'default' | 'tabs'>('default');
    const calendarRef = useRef<SchedulerRef>(null);
    return (
        <Fragment>
            <Button onClick={changeEv}>change</Button>
            <Button onClick={() => moreEv()}>more</Button>
            <div style={{ textAlign: 'center' }}>
                <span> Resource View Mode: </span>
                <Button
                    color={mode === 'default' ? 'primary' : 'inherit'}
                    variant={mode === 'default' ? 'contained' : 'text'}
                    size="small"
                    onClick={() => {
                        setMode('default');
                        calendarRef.current?.scheduler?.handleState(
                            'default',
                            'resourceViewMode'
                        );
                    }}
                >
                    Default
                </Button>
                <Button
                    color={mode === 'tabs' ? 'primary' : 'inherit'}
                    variant={mode === 'tabs' ? 'contained' : 'text'}
                    size="small"
                    onClick={() => {
                        setMode('tabs');
                        calendarRef.current?.scheduler?.handleState(
                            'tabs',
                            'resourceViewMode'
                        );
                    }}
                >
                    Tabs
                </Button>
            </div>
            <Scheduler
                ref={calendarRef}
                events={EVENTS}
                resources={RESOURCES}
                resourceFields={{
                    idField: 'admin_id',
                    textField: 'title',
                    subTextField: 'mobile',
                    avatarField: 'title',
                    colorField: 'color'
                }}
                fields={[
                    {
                        name: 'admin_id',
                        type: 'select',
                        default: RESOURCES[0].admin_id,
                        options: RESOURCES.map((res: { admin_id: any; title: any; mobile: any; }) => {
                            return {
                                id: res.admin_id,
                                text: `${res.title} (${res.mobile})`,
                                value: res.admin_id //Should match "name" property
                            };
                        }),
                        config: { label: 'Assignee', required: true }
                    }
                ]}
                eventRenderer={({ event }: EventRendererProps) => {
                    return (<div>
                        {event.start.toLocaleTimeString('ru-RU', { timeStyle: 'short' })}
                    </div>);
                }}


            />;
        </Fragment>
    )
        ;
}

export default Customers;