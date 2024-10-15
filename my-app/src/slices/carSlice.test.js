import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import carReducer, { addCar, deleteCar, fetchCars, updateCar } from './carsSlice.js'; // Adjust the import path as needed

describe('carSlice', () => {
    let store;
    let mockAxios;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
        store = configureStore({ reducer: { cars: carReducer } }); // Create a Redux store with the car reducer
    });

    afterEach(() => {
        mockAxios.reset(); // Reset the mock axios instance after each test
    });

    test('should fetch cars successfully', async () => {
        const mockCars = [{ _id: '1', name: 'Car A' }, { _id: '2', name: 'Car B' }];
        mockAxios.onGet('https://depi-react-final.vercel.app/api/cars').reply(200, mockCars);

        await store.dispatch(fetchCars()); // Dispatch the fetchCars action

        const state = store.getState().cars; // Get the updated state

        expect(state.loading).toBe(false); // Ensure loading is false
        expect(state.cars).toEqual(mockCars); // Check that the cars are correctly populated
        expect(state.error).toBe(null); // Ensure there is no error
    });

    test('should handle fetch cars error', async () => {
        mockAxios.onGet('https://depi-react-final.vercel.app/api/cars').reply(500);

        await store.dispatch(fetchCars()); // Dispatch the fetchCars action

        const state = store.getState().cars; // Get the updated state

        expect(state.loading).toBe(false); // Ensure loading is false
        expect(state.cars).toEqual([]); // Cars should remain empty
        expect(state.error).toBeDefined(); // Error should be defined
    });

    test('should add a new car', async () => {
        const newCar = { name: 'Car C' };
        const addedCar = { _id: '3', ...newCar };
        mockAxios.onPost('https://depi-react-final.vercel.app/api/cars/add').reply(200, { car: addedCar });

        await store.dispatch(addCar(newCar)); // Dispatch the addCar action

        const state = store.getState().cars; // Get the updated state

        expect(state.loading).toBe(false); // Ensure loading is false
        expect(state.cars).toContainEqual(addedCar); // Ensure the new car is added to the state
        expect(state.error).toBe(null); // Ensure there is no error
    });

    test('should delete a car', async () => {
        const carId = '1';
        const mockCars = [{ _id: carId, name: 'Car A' }];
        store.dispatch({ type: 'cars/fetchCars/fulfilled', payload: mockCars }); // Pre-populate the state

        mockAxios.onDelete(`https://depi-react-final.vercel.app/api/cars/${carId}`).reply(200);

        await store.dispatch(deleteCar(carId)); // Dispatch the deleteCar action

        const state = store.getState().cars; // Get the updated state

        expect(state.cars).not.toContainEqual(mockCars[0]); // Ensure the car is removed from the state
    });

    test('should update a car', async () => {
        const carId = '1';
        const mockCars = [{ _id: carId, name: 'Car A' }];
        store.dispatch({ type: 'cars/fetchCars/fulfilled', payload: mockCars }); // Pre-populate the state

        const updatedCar = { name: 'Updated Car A' };
        mockAxios.onPut(`https://depi-react-final.vercel.app/api/cars/update/${carId}`).reply(200, { updatedCar: { _id: carId, ...updatedCar } });

        await store.dispatch(updateCar({ id: carId, ...updatedCar })); // Dispatch the updateCar action

        const state = store.getState().cars; // Get the updated state

        expect(state.cars).toContainEqual({ _id: carId, ...updatedCar }); // Ensure the car is updated
    });
});
