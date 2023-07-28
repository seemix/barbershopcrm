import React from 'react';
import { EventRendererProps } from '@aldabil/react-scheduler/types';

const EventRender = (props: EventRendererProps) => {
    return (<div {...props} style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontSize: '12px',
        // padding: '5px',
        alignItems: 'center'
    }}>
        <div>
            {props.event.start.toLocaleTimeString('ru-RU', { timeStyle: 'short' })}
        </div>
        <div>{props.event.end.toLocaleTimeString('ru-RU', { timeStyle: 'short' })}</div>
        <div>
            <b>{props.event.ser}</b>
        </div>
    </div>);
};

export default EventRender;