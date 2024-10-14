import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import maintainReducer, { addMaintenance, deleteMaintenance, fetchMaintenance } from './maintainSlice'; // Adjust the import path as needed

describe('maintainSlice', () => {
    let store;
    let mockAxios;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
        store = configureStore({ reducer: { maintain: maintainReducer } }); // Create a Redux store with the maintain reducer
    });

    afterEach(() => {
        mockAxios.reset(); // Reset the mock axios instance after each test
    });

    test('should fetch maintenance records successfully', async () => {
        const mockMaintenanceRecords = [{ _id: '1', description: 'Oil Change' }, { _id: '2', description: 'Tire Rotation' }];
        mockAxios.onGet('http://localhost:5000/api/maintenance').reply(200, mockMaintenanceRecords);

        await store.dispatch(fetchMaintenance()); // Dispatch the fetchMaintenance action

        const state = store.getState().maintain; // Get the updated state

        expect(state.loading).toBe(false); // Ensure loading is false
        expect(state.maintenanceRecords).toEqual(mockMaintenanceRecords); // Check that the maintenance records are correctly populated
        expect(state.error).toBe(null); // Ensure there is no error
    });

    test('should handle fetch maintenance error', async () => {
        mockAxios.onGet('http://localhost:5000/api/maintenance').reply(500);

        await store.dispatch(fetchMaintenance()); // Dispatch the fetchMaintenance action

        const state = store.getState().maintain; // Get the updated state

        expect(state.loading).toBe(false); // Ensure loading is false
        expect(state.maintenanceRecords).toEqual([]); // Maintenance records should remain empty
        expect(state.error).toBeDefined(); // Error should be defined
    });

    test('should add a new maintenance record', async () => {
        const newRecord = { description: 'Brake Inspection' };
        const addedRecord = { _id: '3', ...newRecord };
        mockAxios.onPost('http://localhost:5000/api/maintenance/add').reply(200, { maintenance: addedRecord });

        await store.dispatch(addMaintenance(newRecord)); // Dispatch the addMaintenance action

        const state = store.getState().maintain; // Get the updated state

        expect(state.loading).toBe(false); // Ensure loading is false
        expect(state.maintenanceRecords).toContainEqual({ maintenance: addedRecord }); // Adjust to match the received structure
        expect(state.error).toBe(null); // Ensure there is no error
    });

    test('should delete a maintenance record', async () => {
        const maintenanceId = '1';
        const mockRecords = [{ _id: maintenanceId, description: 'Oil Change' }];
        store.dispatch({ type: 'maintain/fetchMaintenance/fulfilled', payload: mockRecords }); // Pre-populate the state

        mockAxios.onDelete(`http://localhost:5000/api/maintenance/${maintenanceId}`).reply(200);

        await store.dispatch(deleteMaintenance(maintenanceId)); // Dispatch the deleteMaintenance action

        const state = store.getState().maintain; // Get the updated state

        expect(state.maintenanceRecords).not.toContainEqual(mockRecords[0]); // Ensure the maintenance record is removed from the state
    });


});
