import React, { useEffect } from 'react';
import { ScheduleMeeting, StartTimeEventEmit } from 'react-schedule-meeting';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { getFreeSlots } from '../../../store/slots';
import Button from '@mui/material/Button';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { handleBack, handleNext } from '../../../store/stepper';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { removeDateTime, setDateTime } from '../../../store/order';
import { CircularProgress } from '@mui/material';


const ChoseTime = () => {
    // const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
    //     return {
    //         id,
    //         startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
    //         endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
    //     };
    // });
    const { barberId, duration } = useAppSelector(state => state.orderStore);
    const availableTimeslots = useAppSelector(state => state.freeSlotsStore.freeSlots);
    const { status } = useAppSelector(state => state.freeSlotsStore);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getFreeSlots({ barberId, duration }));
    }, [dispatch, duration, barberId]);
    const handleBackButton = () => {
        dispatch(removeDateTime());
        dispatch(handleBack());
    };
    const handleTimeSelect = (data: StartTimeEventEmit) => {
        dispatch(setDateTime(data.availableTimeslot));
    };

    return (
        <div>
            <h3>Choose date & time</h3>
            <div className={'selector_wrapper'}>
                {status === 'loading' && <CircularProgress/>}
                {availableTimeslots &&
                    <ScheduleMeeting
                        lang_emptyListText={'Время для записи недоступно'}
                        lang_goToNextAvailableDayText={'Возможная дата для записи'}
                        borderRadius={3}
                        primaryColor="#9e8a78"
                        eventDurationInMinutes={duration}
                        availableTimeslots={availableTimeslots}
                        onStartTimeSelect={(data: StartTimeEventEmit) => handleTimeSelect(data)}
                        backgroundColor="white"
                    />
                }
                <div className={'buttons_wrapper'}>
                    <div>
                        {
                            <Button variant={'contained'}
                                    onClick={handleBackButton}
                                    style={{ marginBottom: '20px', padding: '10px 15px' }}> <KeyboardArrowLeft/> Назад
                            </Button>
                        }
                    </div>
                    <div>
                        {
                            <Button variant={'contained'}
                                    onClick={() => dispatch(handleNext())}
                                    style={{ marginBottom: '20px', padding: '10px 15px' }}> Далее <KeyboardArrowRight/>
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoseTime;