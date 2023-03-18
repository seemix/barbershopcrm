import React from 'react';

export const CustomEventRenderer = (event: any) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <div
                style={{ height: 20, background: '#ffffffb5', color: 'black' }}
            >
                {event.start.toLocaleTimeString('ru-RU', {
                    timeStyle: 'short'
                })}
            </div>
            <div
                style={{ height: 20, background: '#ffffffb5', color: 'black' }}
            >
                {event.end.toLocaleTimeString('ru-RU', { timeStyle: 'short' })}
            </div>
        </div>
    );
};

