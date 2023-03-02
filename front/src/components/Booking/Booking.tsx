import React, { FC } from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';

import ChoseTime from './steps/ChoseTime';
import ChoseService from './steps/ChoseService';
import ChoseBarber from './steps/ChoseBarber';
import { useAppSelector } from '../../hooks/redux';
import ChoseAdditional from './steps/ChoseAdditional';
import CustomerForm from './steps/CustomerForm';
import FinalStep from './steps/FinalStep';

const Booking: FC = () => {
    const steps = [
        <ChoseBarber/>,
        <ChoseService/>,
        <ChoseAdditional/>,
        <ChoseTime/>,
        <CustomerForm/>,
        <FinalStep/>
    ];
    const order = useAppSelector(state => state.orderStore);
    console.log(order);
    const { activeStep } = useAppSelector(state => state.stepperStore);
    const maxSteps = steps.length;

    return (
        <div id={'booking'} style={{ height: 'calc(100vh - 150px)' }}
             className={order.showBooking ? 'services show_item' : 'services hide_item'}>

            <h2>Booking</h2>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: '#fcf9f5'
            }}>
                <div>
                    <div style={{ minWidth: 400, maxWidth: 1100 }}>
                        <Box sx={{ height: 'auto', p: 0 }}>
                            {steps[activeStep]}
                        </Box>
                        <MobileStepper
                            variant="text"
                            steps={maxSteps}
                            position="static"
                            color={'#fcf9f5'}
                            activeStep={activeStep}
                            nextButton={null}
                            backButton={null}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;