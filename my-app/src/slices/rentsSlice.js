// @ts-nocheck
// src/slices/rentsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all rents
const fetchRents = createAsyncThunk('rents/fetchRents', async () => {
    const response = await axios.get('http://localhost:5000/api/rents');
    return response.data;
});

// Async thunk to add a new rent
const addRent = createAsyncThunk('rents/addRent', async (rentData, { dispatch }) => {
    const response = await axios.post('http://localhost:5000/api/rents/add', rentData);
    dispatch(fetchRents()); // Refresh rents after adding
    return response.data;
});

// Async thunk to delete a rent by ID
const deleteRent = createAsyncThunk('rents/deleteRent', async (rentId) => {
    await axios.delete(`http://localhost:5000/api/rents/delete/${rentId}`);
    return rentId; // Return ID for removal
});

// Async thunk to update the status of a rent
const updateRentStatus = createAsyncThunk('rents/updateRentStatus', async ({ rentId, newStatus }) => {
    const response = await axios.put(`http://localhost:5000/api/rents/updateStatus/${rentId}`, { status: newStatus });
    return response.data; // Return updated rent
});

// Async thunk to update rent details
const updateRent = createAsyncThunk('rents/updateRent', async (rentData) => {
    const { _id, ...updates } = rentData; // Get rent ID and updates
    const response = await axios.put(`http://localhost:5000/api/rents/update/${_id}`, updates);
    return response.data; // Return updated rent
});

// Initial state for rents
const initialState = {
    rents: [],
    loading: false,
    error: null,
};

// Create the rents slice
const rentsSlice = createSlice({
    name: 'rents',
    initialState,
    reducers: {}, // No synchronous reducers defined
    extraReducers: (builder) => {
        builder
            .addCase(fetchRents.pending, (state) => {
                state.loading = true; // Set loading to true
                state.error = null; // Reset error
            })
            .addCase(fetchRents.fulfilled, (state, action) => {
                state.loading = false; // Loading finished
                state.rents = action.payload; // Update rents with fetched data
            })
            .addCase(fetchRents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Capture error message
            })
            .addCase(addRent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRent.fulfilled, (state, action) => {
                state.loading = false;
                state.rents.push(action.payload); // Add new rent to the list
            })
            .addCase(addRent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteRent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRent.fulfilled, (state, action) => {
                state.loading = false;
                state.rents = state.rents.filter((rent) => rent._id !== action.payload); // Remove deleted rent
            })
            .addCase(deleteRent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateRentStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRentStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.rents.findIndex(rent => rent._id === action.payload._id); // Find rent to update
                if (index !== -1) {
                    state.rents[index] = action.payload; // Update rent with new status
                }
            })
            .addCase(updateRentStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateRent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRent.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.rents.findIndex(rent => rent._id === action.payload._id); // Find rent to update
                if (index !== -1) {
                    state.rents[index] = action.payload; // Replace rent with updated rent
                }
            })
            .addCase(updateRent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Capture error message
            });
    },
});

// Export async thunks and reducer
export { addRent, deleteRent, fetchRents, updateRent, updateRentStatus };
export default rentsSlice.reducer;
