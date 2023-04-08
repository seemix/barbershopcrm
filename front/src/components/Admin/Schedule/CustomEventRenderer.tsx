import React from 'react';
import { EventRendererProps } from '@aldabil/react-scheduler/types';

export const CustomEventRenderer = ({event, ...props}: EventRendererProps) => {

    return (
        <div {...props}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <div
                style={{ height: 20, background: '#ffffffb5', color: 'black', fontSize: '12px', textAlign: 'center' }}
            >
                {event.start.toLocaleTimeString('ru-RU', {
                    timeStyle: 'short'
                })}
            </div>
            <div
                style={{ height: 20, background: '#ffffffb5', color: 'black', fontSize: '12px', textAlign: 'center' }}
            >
                {event.end.toLocaleTimeString('ru-RU', { timeStyle: 'short' })}
            </div>
        </div>
    );
};

