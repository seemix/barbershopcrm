import React, { useEffect } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { ScheduleMeeting, StartTimeEventEmit } from 'react-schedule-meeting';
import Button from '@mui/material/Button';

import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { getFreeSlots } from '../../../store/slots';
import { handleBack, handleNext } from '../../../store/stepper';
import { removeDateTime, setDateTime } from '../../../store/order';
import { useTranslation } from 'react-i18next';


const ChoseTime = () => {
    const { t } = useTranslation();
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
            <h3>{t('Выберите  дату и время')}</h3>
            <div className={'selector_wrapper'}>
                {status === 'loading' && <CircularProgress/>}
                {status === 'fulfilled' && availableTimeslots &&
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
                <div className={'buttons_wrapper'} style={{ width: '400px' }}>
                    <div>
                        {
                            <Button variant={'contained'}
                                    onClick={handleBackButton}
                                    style={{ marginBottom: '20px', padding: '10px 15px' }}>
                                <KeyboardArrowLeft/> {t('назад')}
                            </Button>
                        }
                    </div>
                    <div>
                        {
                            <Button variant={'contained'}
                                    onClick={() => dispatch(handleNext())}
                                    style={{ marginBottom: '20px', padding: '10px 15px' }}> {t('далее')}
                                <KeyboardArrowRight/>
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoseTime;