import { configureStore } from '@reduxjs/toolkit';
import carsReducer from '../slices/carsSlice';
import maintenanceReducer from '../slices/maintainSlice';
import rentsReducer from '../slices/rentsSlice';

// Using the toolkit redux we configure the store and pass
// it the reducers we declared and then export it so we can use it
// with the <provider> later on the app.js
const store = configureStore({
    reducer: {
        rents: rentsReducer,
        cars: carsReducer,
        maintenance: maintenanceReducer,
    },
});

export default store;