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
import customersStore from './customer';
import barberServiceStore from './barberService';
import barberAdditionalStore from './barberAdditional';

export const store = configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        barberStore,
        barberAdditionalStore,
        barberServiceStore,
        customersStore,
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
