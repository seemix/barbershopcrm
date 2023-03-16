import React, { useState } from 'react';
import { SchedulerHelpers } from '@aldabil/react-scheduler/types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateTimeField } from '@mui/x-date-pickers';
import { Button, DialogActions, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useAppDispatch } from '../../../hooks/redux';
import { createSchedule, getAllSchedules, updateSchedule } from '../../../store/schedule';

interface CustomEditorProps {
    scheduler: SchedulerHelpers;
}

const ScheduleEditor = ({ scheduler }: CustomEditorProps) => {
    const event = scheduler.edited;
    const dispatch = useAppDispatch();
    const [state, setState] = useState({
        event_id: scheduler?.state.event_id.value,
        start: scheduler?.state.start.value || '',
        end: event?.end || scheduler.state.end.value,
        count: 1
    });
    const handleSubmit = async () => {
        if (event) {
            await dispatch(updateSchedule({
                start: String(scheduler.state.start.value),
                end: String(state.end),
                barber: scheduler.state.admin_id.value,
                id: event.event_id
            },));
        } else {
            await dispatch(createSchedule({
                start: String(scheduler.state.start.value),
                end: String(state.end),
                barber: scheduler.state.admin_id.value,
                count: state.count
            }));
        }

        dispatch(getAllSchedules());
        scheduler.close();
    };
    const start = String(scheduler.state.start.value);

    const handleChange = (value: any, name: string) => {
        setState((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            rowGap: '15px',
            padding: '20px'
        }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div><p style={{ textAlign: 'center' }}>Добавить/редактировать промежуток</p></div>
                <div>
                    <DateTimeField
                        fullWidth
                        label={'start'}
                        defaultValue={dayjs(start)}
                        ampm={false}
                        disabled
                        onChange={(e) => handleChange(String(e), 'start')}
                    />
                </div>
                <div>
                    <DateTimeField
                        fullWidth
                        ampm={false}
                        defaultValue={dayjs(state.end)}
                        label={'end'}
                        onChange={(e) => handleChange(String(dayjs(e)), 'end')}
                    />
                </div>
                <div className={!event ? 'show_item' : 'hide_item'}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p>повторить промежуток:</p>
                        <br/><br/>
                        <FormControl fullWidth>
                            <InputLabel id="days">Дней</InputLabel>
                            <Select
                                id="days"
                                label="Дней"
                                defaultValue={1}
                                onChange={(e) => handleChange(e.target.value, 'count')}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div style={{ margin: '0 auto' }}>
                    <DialogActions>
                        <Button onClick={handleSubmit}>ОК</Button>
                        <Button onClick={scheduler.close}>Отмена</Button>
                    </DialogActions>
                </div>
            </LocalizationProvider>
        </div>
    );
};

export default ScheduleEditor;