import { configureStore } from '@reduxjs/toolkit';
import barberStore from './barbers';
import orderStore from './order';
import stepperStore from './stepper';
import serviceStore from './services';
import additionalStore from './additional';
import freeSlotsStore from './slots';

export const store = configureStore({
    reducer: { barberStore, orderStore, stepperStore, serviceStore, additionalStore, freeSlotsStore }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import {combineReducers, configureStore} from "@reduxjs/toolkit";
// import userReducer from './reducers/UserSlice'
// import {postAPI} from "../services/PostService";
//
// const rootReducer = combineReducers({
//     userReducer,
//     [postAPI.reducerPath]: postAPI.reducer
// })
//
// export const setupStore = () => {
//     return configureStore({
//         reducer: rootReducer,
//         middleware: (getDefaultMiddleware) =>
//             getDefaultMiddleware()
//                 .concat(postAPI.middleware)
//     })
// }
//
// export type RootState = ReturnType<typeof rootReducer>
// export type AppStore = ReturnType<typeof setupStore>
// export type AppDispatch = AppStore['dispatch']
