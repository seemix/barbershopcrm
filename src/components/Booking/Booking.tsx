import React, { FC } from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import ChoseTime from './steps/ChoseTime';
import ChoseService from './steps/ChoseService';
import ChoseBarber from './steps/ChoseBarber';
import { useAppSelector } from '../../hooks/redux';
import ChoseAdditional from './steps/ChoseAdditional';
import CustomerForm from './steps/CustomerForm';

const Booking: FC = () => {
    const steps = [
        <ChoseBarber/>,
        <ChoseService/>,
        <ChoseAdditional/>,
        <ChoseTime/>,
        <CustomerForm/>
    ];
    const order = useAppSelector(state => state.orderStore);
    console.log(order);
    const { activeStep } = useAppSelector(state => state.stepperStore);
    const maxSteps = steps.length;

    return (
        <div id={'booking'}>
            <h2>Booking</h2>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: '#fcf9f5'
            }}>
                <div>
                    <Box sx={{ minWidth: 400, maxWidth: 1100, flexGrow: 1 }}>
                        <Paper
                            square
                            elevation={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                // height: 50,
                                pl: 2,
                                bgcolor: 'background.default',
                            }}
                        >
                        </Paper>
                        <Box sx={{ height: 'auto', p: 2 }}>
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
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default Booking;

