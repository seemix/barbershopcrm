import React, { useState } from 'react';
import { ProcessedEvent, SchedulerHelpers } from '@aldabil/react-scheduler/types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateTimeField, TimePicker } from '@mui/x-date-pickers';
import { Button, DialogActions, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { createSchedule } from '../../../store/schedule';
import { PickerChangeHandler } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue';

interface CustomEditorProps {
    scheduler: SchedulerHelpers;
}

const TempCom = ({ scheduler }: CustomEditorProps) => {
    const event = scheduler.edited;
    const { user } = useAppSelector(state => state.authStore);
    const dispatch = useAppDispatch();
    const [state, setState] = useState({
        start: scheduler?.state.start.value || '',
        end: event?.end || '',
        count: 1
    });
    const handleSubmit = async () => {
        //e.preventDefault();
        //  const event = scheduler.state;
        // scheduler.onConfirm(event, null);
        await dispatch(createSchedule({
            schedule: [{
                start: String(scheduler.state.start.value),
                //end: String(scheduler.state.end.value),
                end: String(state.end),
                barber: user.barber
            }],
            count: 2
        }));
        const added_updated_event: ProcessedEvent =
            {
                event_id: Math.random(),
                title: '',
                start: new Date(state.start),
                end: new Date(state.end)
                // start: scheduler.state.start.value,
                // end: scheduler.state.end.value,
                // barber: '63e7cfcf5f71d58ec927d84e'
            };
      //  scheduler.onConfirm(added_updated_event, event ? 'edit' : 'create');
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
    console.log(state);
    // @ts-ignore
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            rowGap: '15px',
            padding: '20px'
        }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div><p style={{ textAlign: 'center' }}><big>Добавить промежуток</big></p></div>
                <div>
                    <DateTimeField
                    ///inputRef={...register({ required: true })}
                    label={'start'}
                    defaultValue={dayjs(start)}
                    ampm={false}
                    disabled
                    onChange={(e) => handleChange(String(e), 'start')}
                />
                </div>
                <div>
                    <DateTimeField
                       // clearable={true}
                        ampm={false}
                        defaultValue={dayjs(start).add(1,'hours')}
                        label={'end'}
                        onChange={(e) => handleChange(String(e), 'end')}
                        //value={selectedDate}
                       // onChange={handleDateChange}
                    />
                {/*    <DateTimeField*/}
                {/*    label={'end'} defaultValue={dayjs(start).add(1, 'hour')}*/}
                {/*   onChange={(e) => handleChange(String(e), 'end')}*/}

                {/*/>*/}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p>повторить промежуток:</p>
                    <br/><br/><br/>
                    <FormControl fullWidth>
                        <InputLabel id="days">Дней</InputLabel>
                        <Select
                            id="days"
                            label="Дней"
                            value={scheduler.state.days}
                            onChange={(e:any) => handleChange(e, 'count')}
                            // onChange={handleChange}
                        >
                            <MenuItem defaultChecked={true} value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ margin: '0 auto' }}>
                    <DialogActions>
                        <Button onClick={handleSubmit}>Добавить</Button>
                        <Button onClick={scheduler.close}>Отмена</Button>
                    </DialogActions>
                </div>
                {/*</form>*/}
            </LocalizationProvider>
        </div>
    );
};

export default TempCom;