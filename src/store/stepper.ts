import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeStep: 0
};

export const stepperSlice = createSlice({
    name: 'stepperSlice',
    initialState,
    reducers: {
        handleNext(state) {
            state.activeStep++;
        },
        handleBack(state) {
            state.activeStep--;
        }
    }
});

export const { handleNext, handleBack } = stepperSlice.actions;
export const stepperStore = stepperSlice.reducer;
export default stepperStore;