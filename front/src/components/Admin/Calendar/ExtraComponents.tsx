import { Face, Phone } from '@mui/icons-material';
import React from 'react';

export const ExtraComponents = (fields:any, event:any) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px', columnGap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                <div><Face/></div>
                <div>{event.customer}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                <div><Phone/></div>
                <div>{event.phone || 'Nothing...'}</div>
            </div>
        </div>
    );
};