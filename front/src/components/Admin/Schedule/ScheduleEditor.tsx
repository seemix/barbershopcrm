import React, { useState } from 'react';
import { DialogActions, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { closeScheduleModal, createSchedule, deleteSchedule, updateSchedule } from '../../../store/schedule';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useForm } from 'react-hook-form';

const ScheduleEditor = () => {
    const { editEvent } = useAppSelector(state => state.scheduleStore);
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();
    const [date, setDate] = useState({ start: editEvent.start, end: editEvent.end });
    const handleChange = (value: any, name: string) => {
        setDate((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };
    const submitForm = (data: any) => {
        if (!data.start) data.start = editEvent.start;
        if (editEvent.event_id) {
            dispatch(updateSchedule({
                start: dayjs(date.start).toJSON(),
                end: dayjs(date.end).toJSON(),
                admin_id: editEvent.admin_id,
                event_id: editEvent.event_id
            }));
        } else {
            dispatch(createSchedule({
                start: data.start,
                end: dayjs(date.end).toJSON(),
                barber: editEvent.admin_id,
                count: data.days
            }));
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            rowGap: '15px',
            padding: '20px'
        }}>
            {editEvent.event_id &&
                <Button onClick={() => dispatch(deleteSchedule(editEvent.event_id))}>Удалить промежуток</Button>}
            <form onSubmit={handleSubmit(submitForm)}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div>
                        <DateTimeField
                            fullWidth
                            label={'start'}
                            //@ts-ignore
                            defaultValue={dayjs(editEvent.start)}
                            ampm={false}
                            disabled={!editEvent.event_id}
                            onChange={(e) => handleChange(String(e), 'start')}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <DateTimeField
                            fullWidth
                            ampm={false}
                            //@ts-ignore
                            defaultValue={dayjs(editEvent.end)}
                            label={'end'}
                            onChange={(e) => handleChange(String(dayjs(e)), 'end')}

                        />
                    </div>
                </LocalizationProvider>
                <div className={!editEvent.event_id ? 'show_item' : 'hide_item'}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p>повторить промежуток:</p>
                        <br/><br/>
                        <FormControl fullWidth>
                            <InputLabel id="days">Дней</InputLabel>
                            <Select
                                {...register('days')}
                                id="days"
                                label="Дней"
                                defaultValue={1}
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
                <DialogActions>
                    <Button onClick={() => dispatch(closeScheduleModal())}>Отмена</Button>
                    <Button type={'submit'}>ОК</Button>
                </DialogActions>
            </form>
        </div>
    );
};

export default ScheduleEditor;