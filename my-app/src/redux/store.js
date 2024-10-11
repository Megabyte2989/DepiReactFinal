import { configureStore } from '@reduxjs/toolkit';
import carsReducer from '../slices/carsSlice';
import maintenanceReducer from '../slices/maintainSlice';
import rentsReducer from '../slices/rentsSlice';

const store = configureStore({
    reducer: {
        rents: rentsReducer,
        cars: carsReducer,
        maintenance: maintenanceReducer,
    },
});

export default store;