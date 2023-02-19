import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ChoseTime from './steps/ChoseTime';
import ChoseService from './steps/ChoseService';
import ChoseBarber from './steps/ChoseBarber';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { handleBack, handleNext } from '../../store/stepper';
import ChoseAdditional from './steps/ChoseAdditional';

const Booking: FC = () => {
    const steps = [
        <ChoseBarber/>,
        <ChoseService/>,
        <ChoseAdditional/>,
        <ChoseTime/>
        // {
        //     label: 'Select campaign settings',
        //     description: `For each ad campaign that you create, you can control how much
        //       you're willing to spend on clicks and conversions, which networks
        //       and geographical locations you want your ads to show on, and more.`,
        // },
        // {
        //     label: 'Create an ad group',
        //     description:
        //         'An ad group contains one or more ads which target a shared set of keywords.',
        // },
        // {
        //     label: 'Create an ad',
        //     description: `Try out different ad text to see what brings in the most customers,
        //       and learn how to enhance your ads using features like ad extensions.
        //       If you run into any problems with your ads, find out how to tell if
        //       they're running and how to resolve approval issues.`,
        // },
    ];


    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { activeStep } = useAppSelector(state => state.stepperStore);
    // const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    // const handleNext = () => {
    //     dispatch(handleNext());
    //    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };
    //
    // const handleBack = () => {
    //     dispatch(handleBack())
    //    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };
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
                        <Box sx={{ height: 'auto',  p: 2 }}>
                            {steps[activeStep]}
                        </Box>
                        <MobileStepper
                            variant="progress"
                            steps={maxSteps}
                            position="static"
                            color={'#fcf9f5'}
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    style={{}}
                                    size="small"
                                    onClick={() => dispatch(handleNext())}
                                    disabled={activeStep === maxSteps - 1}
                                >
                                    Next
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowLeft/>
                                    ) : (
                                        <KeyboardArrowRight/>
                                    )}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={() => dispatch(handleBack())} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowRight/>
                                    ) : (
                                        <KeyboardArrowLeft/>
                                    )}
                                    Back
                                </Button>
                            }
                        />
                    </Box>
                </div>
                {/*<div><p>1111</p></div>*/}
            </div>
        </div>
    );
};

export default Booking;

