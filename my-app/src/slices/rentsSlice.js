// @ts-nocheck
// src/slices/rentsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunk for fetching rents
const fetchRents = createAsyncThunk('rents/fetchRents', async () => {
    const response = await axios.get('http://localhost:5000/api/rents');
    return response.data;
});

const addRent = createAsyncThunk('rents/addRent', async (rentData, { dispatch }) => {
    const response = await axios.post('http://localhost:5000/api/rents/add', rentData);
    dispatch(fetchRents());
    return response.data;
});
const deleteRent = createAsyncThunk('rents/deleteRent', async (rentId) => {
    await axios.delete(`http://localhost:5000/api/rents/delete/${rentId}`);
    return rentId; // Return the rentId to use in the fulfilled case
});

const updateRentStatus = createAsyncThunk('rents/updateRentStatus', async ({ rentId, newStatus }) => {
    const response = await axios.put(`http://localhost:5000/api/rents/updateStatus/${rentId}`, { status: newStatus });
    return response.data; // Return the updated rent
});

const updateRent = createAsyncThunk('rents/updateRent', async (rentData) => {
    const { _id, ...updates } = rentData; // Destructure to get rentId and the rest as updates
    const response = await axios.put(`http://localhost:5000/api/rents/update/${_id}`, updates);
    return response.data; // Return the updated rent
});

// Define the initial state for rents
const initialState = {
    rents: [],
    loading: false,
    error: null,
};

// Create rents slice
const rentsSlice = createSlice({
    name: 'rents',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRents.fulfilled, (state, action) => {
                state.loading = false;
                state.rents = action.payload;
            })
            .addCase(fetchRents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(addRent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRent.fulfilled, (state, action) => {
                state.loading = false;
                state.rents.push(action.payload);  // Add the new rent to the list
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
                state.rents = state.rents.filter((rent) => rent._id !== action.payload);  // Remove the deleted rent
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
                // Update the rent in the rents array
                const index = state.rents.findIndex(rent => rent._id === action.payload._id);
                if (index !== -1) {
                    state.rents[index] = action.payload; // Update the rent with the new status
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
                // Update the entire rent in the rents array
                const index = state.rents.findIndex(rent => rent._id === action.payload._id);
                if (index !== -1) {
                    state.rents[index] = action.payload; // Replace the rent with the updated rent
                }
            })
            .addCase(updateRent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export the async thunk
export { addRent, deleteRent, fetchRents, updateRent, updateRentStatus };

// Export the reducer
export default rentsSlice.reducer;
