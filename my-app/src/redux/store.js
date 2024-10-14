import { configureStore } from '@reduxjs/toolkit';
import carsReducer from '../slices/carsSlice.js';
import maintenanceReducer from '../slices/maintainSlice.js';
import rentsReducer from '../slices/rentsSlice.js';

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