import { Scheduler } from '@aldabil/react-scheduler';
import React, { useEffect, useRef } from 'react';
import { ru } from 'date-fns/locale';
import Button from '@mui/material/Button';
import { CircularProgress, Dialog } from '@mui/material';
import { EventRendererProps, SchedulerRef } from '@aldabil/react-scheduler/types';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getAllSchedules, openScheduleModal } from '../../../store/schedule';
import { getAllBarbers } from '../../../store/barbers';
import ScheduleEditor from './ScheduleEditor';
import { closeScheduleModal } from '../../../store/schedule';
import { dayAsset, resourceFieldsAsset, weekAsset } from './scheduleAssets';
import './Schedule.css';


const Schedule = () => {
    const calendarRef = useRef<SchedulerRef>(null);
    const dispatch = useAppDispatch();
    const { result, status, loading, scheduleModal } = useAppSelector(state => state.scheduleStore);
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
        dispatch(getAllSchedules());
        dispatch(getAllBarbers());
        calendarRef.current?.scheduler?.handleState(result, 'events');
    }, [dispatch]);

    useEffect(() => {
        calendarRef.current?.scheduler?.handleState(result, 'events');
    }, [result]);
    // const handleDelete = (id: string | number): Promise<string | number | void> => {
    //     return new Promise((res) => {
    //         dispatch(deleteSchedule(id));
    //         res('ok');
    //     });
    // };
    // const [mode, setMode] = useState<'default' | 'tabs'>('tabs');
    // const [editEvent, setEditEvent] = useState<CustomEditorProps>();
    const handleClick = (event: any) => {
        dispatch(openScheduleModal(event));
    };
    return (
        <div>
            <h2> {status === 'loading' && <CircularProgress/>}</h2>
            {/*<div style={{ textAlign: 'center' }}>*/}
            {/*    <span> Переключатель вида: </span>*/}
            {/*    <Button*/}
            {/*        color={mode === 'default' ? 'primary' : 'inherit'}*/}
            {/*        variant={mode === 'default' ? 'contained' : 'text'}*/}
            {/*        size="small"*/}
            {/*        onClick={() => {*/}
            {/*            setMode('default');*/}
            {/*            calendarRef.current?.scheduler?.handleState(*/}
            {/*                'default',*/}
            {/*                'resourceViewMode'*/}
            {/*            );*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        Default*/}
            {/*    </Button>*/}
            {/*    <Button*/}
            {/*        color={mode === 'tabs' ? 'primary' : 'inherit'}*/}
            {/*        variant={mode === 'tabs' ? 'contained' : 'text'}*/}
            {/*        size="small"*/}
            {/*        onClick={() => {*/}
            {/*            setMode('tabs');*/}
            {/*            calendarRef.current?.scheduler?.handleState(*/}
            {/*                'tabs',*/}
            {/*                'resourceViewMode'*/}
            {/*            );*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        Tabs*/}
            {/*    </Button>*/}
            {/*</div>*/}
            {resources.length > 0 && result.length > 0 &&
                <Scheduler
                    loading={loading}
                    locale={ru}
                    ref={calendarRef}
                    events={result}
                    hourFormat={'24'}
                    //@ts-ignore
                    day={{...dayAsset,
                        cellRenderer: ({ ...props }) => {
                            return (<Button className={'cell_render_button'}
                                            onClick={() => dispatch(openScheduleModal(props))}></Button>);
                        }
                    }}
                    //@ts-ignore
                    week={{
                        ...weekAsset,
                        cellRenderer: ({ ...props }) => {
                            return (<Button className={'cell_render_button'}
                                            onClick={() => dispatch(openScheduleModal(props))}></Button>);
                        }
                    }}
                    resources={resources}
                    resourceViewMode={'default'}
                    resourceFields={resourceFieldsAsset}
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
                    // onDelete={(id) => handleDelete(id)}
                    eventRenderer={(props: EventRendererProps) => {
                        return (<div className={'schedule_custom_event'}
                            onClick={() => handleClick(props.event)}>
                            <div className={'schedule_event_time'}>
                                {props.event.start.toLocaleTimeString('ru-RU', { timeStyle: 'short' })}
                            </div>
                            <div></div>
                            <div className={'schedule_event_time'}>
                                {props.event.end.toLocaleTimeString('ru-RU', { timeStyle: 'short' })}
                            </div>
                        </div>);
                    }}
                />
            }
            <Dialog open={scheduleModal} onClose={() => dispatch(closeScheduleModal())}>
                <ScheduleEditor/>
            </Dialog>
        </div>
    );
};
export default Schedule;