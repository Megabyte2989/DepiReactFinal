// src/slices/rentsSlice.test.js
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import reducer, {
    addRent,
    deleteRent,
    fetchRents,
    updateRent
} from './rentsSlice';

// Mock Axios
const mock = new MockAdapter(axios);

// Helper function to create a test store
const createTestStore = () => {
    return configureStore({
        reducer: {
            rents: reducer,
        },
    });
};

describe('rentsSlice', () => {
    let store;

    beforeEach(() => {
        store = createTestStore();
        mock.reset();
    });

    it('should handle initial state', () => {
        const state = store.getState().rents;
        expect(state).toEqual({
            rents: [],
            loading: false,
            error: null,
        });
    });

    it('should fetch rents successfully', async () => {
        const mockRents = [{ _id: '1', name: 'Test Rent' }];
        mock.onGet('http://localhost:5000/api/rents').reply(200, mockRents);

        await store.dispatch(fetchRents());

        const state = store.getState().rents;
        expect(state.rents).toEqual(mockRents);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
    });

    it('should handle fetch rents failure', async () => {
        mock.onGet('http://localhost:5000/api/rents').reply(500);

        await store.dispatch(fetchRents());

        const state = store.getState().rents;
        expect(state.loading).toBe(false);
        expect(state.error).toBeDefined();
        expect(state.rents).toEqual([]);
    });

    it('should add a new rent successfully', async () => {
        const newRent = { _id: '2', name: 'New Rent' };
        mock.onPost('http://localhost:5000/api/rents/add').reply(200, newRent);
        mock.onGet('http://localhost:5000/api/rents').reply(200, [newRent]);

        await store.dispatch(addRent(newRent));

        const state = store.getState().rents;
        expect(state.rents).toContainEqual(newRent);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
    });

    it('should delete a rent successfully', async () => {
        const rentId = '1';
        mock.onDelete(`http://localhost:5000/api/rents/delete/${rentId}`).reply(200);

        await store.dispatch(deleteRent(rentId));

        const state = store.getState().rents;
        expect(state.rents.find(rent => rent._id === rentId)).toBeUndefined();
        expect(state.loading).toBe(false);
    });


    it('should update rent details successfully', async () => {
        // Step 1: Set up an initial state with a rent
        const initialRent = { _id: '2', name: 'Initial Rent' };
        mock.onGet('http://localhost:5000/api/rents').reply(200, [initialRent]);
        await store.dispatch(fetchRents()); // Fetch initial rents to populate the state

        // Step 2: Prepare the updated rent
        const updatedRent = { _id: '2', name: 'Updated Rent' };
        mock.onPut(`http://localhost:5000/api/rents/update/${updatedRent._id}`).reply(200, updatedRent);

        // Step 3: Dispatch the update action
        await store.dispatch(updateRent(updatedRent));

        // Step 4: Check the state for the updated rent
        const state = store.getState().rents;
        expect(state.rents.find(rent => rent._id === updatedRent._id)?.name).toBe(updatedRent.name);
        expect(state.loading).toBe(false);
    });
});
