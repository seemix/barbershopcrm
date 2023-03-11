import { configureStore } from '@reduxjs/toolkit';
import barberStore from './barbers';
import orderStore from './order';
import stepperStore from './stepper';
import serviceStore from './services';
import additionalStore from './additional';
import freeSlotsStore from './slots';
import recordStore from './record';
import authStore from './auth';
import scheduleStore from './schedule';

export const store = configureStore({
    reducer: {
        barberStore,
        orderStore,
        stepperStore,
        serviceStore,
        additionalStore,
        freeSlotsStore,
        recordStore,
        authStore,
        scheduleStore
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
