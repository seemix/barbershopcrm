import React from 'react';
import { SchedulerHelpers } from '@aldabil/react-scheduler/types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateTimeField } from '@mui/x-date-pickers';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const TempCom = (scheduler: SchedulerHelpers) => {
    const start = String(scheduler.state.start.value);
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
                <div><DateTimeField label={'start'} defaultValue={dayjs(start)}/></div>
                <div><DateTimeField label={'end'} defaultValue={dayjs(start).add(1, 'hour')}/></div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p>повторить промежуток:</p>
                    <br/><br/><br/>
                    <FormControl fullWidth>
                        <InputLabel id="days">Дней</InputLabel>
                        <Select
                            id="days"
                            // value={age}
                            label="Дней"
                            // onChange={handleChange}
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
                <div style={{ margin: '0 auto' }}>
                    <Button onClick={scheduler.close}>Добавить</Button>
                    <Button onClick={scheduler.close}>Отмена</Button>
                </div>
            </LocalizationProvider>
        </div>
    );
};

export default TempCom;