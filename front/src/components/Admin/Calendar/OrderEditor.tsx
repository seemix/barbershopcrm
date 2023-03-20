import React, { useState } from 'react';

import { SchedulerHelpers } from '@aldabil/react-scheduler/types';
import { useAppDispatch } from '../../../hooks/redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimeField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Button, DialogActions } from '@mui/material';

interface CustomEditorProps {
    scheduler: SchedulerHelpers;
}

const OrderEditor = ({ scheduler }: CustomEditorProps) => {
    const event = scheduler.edited;
    const dispatch = useAppDispatch();
    const start = String(scheduler.state.start.value);
    const [state, setState] = useState({
        start: String(scheduler.state.start.value)
    });
    const handleChange = (value: any, name: string) => {
        setState((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };
    const handleSubmit = () => {

    }
    return (
        <div style={{padding: '20px'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimeField
                    //fullWidth
                    label={'start'}
                    defaultValue={dayjs(start)}
                    ampm={false}
                    //disabled
                    onChange={(e) => handleChange(String(e), 'start')}
                />
                <DialogActions>
                    <Button onClick={handleSubmit}>ОК</Button>
                    <Button onClick={scheduler.close}>Отмена</Button>
                </DialogActions>
            </LocalizationProvider>

        </div>
    );
};

export default OrderEditor;