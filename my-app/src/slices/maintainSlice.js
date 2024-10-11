// @ts-nocheck
// src/slices/maintainSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunk for fetching maintenance records
const fetchMaintenance = createAsyncThunk('maintenance/fetchMaintenance', async () => {
    const response = await axios.get('http://localhost:5000/api/maintenance');
    return response.data;
});

// Create async thunk for adding a maintenance record
const addMaintenance = createAsyncThunk('maintenance/addMaintenance', async (maintenanceData, { dispatch }) => {
    const response = await axios.post('http://localhost:5000/api/maintenance/add', maintenanceData);
    dispatch(fetchMaintenance()); // Refresh the list after adding
    return response.data;
});

// Create async thunk for deleting a maintenance record
const deleteMaintenance = createAsyncThunk('maintenance/deleteMaintenance', async (maintenanceId) => {
    await axios.delete(`http://localhost:5000/api/maintenance/${maintenanceId}`);
    return maintenanceId; // Return the maintenanceId to use in the fulfilled case
});

// Create async thunk for updating a maintenance record
const updateMaintenance = createAsyncThunk('maintenance/updateMaintenance', async (maintenanceData) => {
    const { maintenanceId, ...updates } = maintenanceData; // Destructure to get maintenanceId and the rest as updates
    const response = await axios.put(`http://localhost:5000/api/maintenance/update/${maintenanceId}`, updates);
    return response.data; // Return the updated maintenance record
});

// Define the initial state for maintenance records
const initialState = {
    maintenanceRecords: [],
    loading: false,
    error: null,
};

// Create maintenance slice
const maintainSlice = createSlice({
    name: 'maintenance',
    initialState,
    reducers: {
        // Optional: you can add any additional reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaintenance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMaintenance.fulfilled, (state, action) => {
                state.loading = false;
                state.maintenanceRecords = action.payload;
            })
            .addCase(fetchMaintenance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(addMaintenance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMaintenance.fulfilled, (state, action) => {
                state.loading = false;
                state.maintenanceRecords.push(action.payload); // Add the new maintenance record to the list
            })
            .addCase(addMaintenance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteMaintenance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMaintenance.fulfilled, (state, action) => {
                state.loading = false;
                state.maintenanceRecords = state.maintenanceRecords.filter(
                    (record) => record._id !== action.payload
                ); // Remove the deleted maintenance record
            })
            .addCase(deleteMaintenance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateMaintenance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMaintenance.fulfilled, (state, action) => {
                state.loading = false;
                // Update the specific maintenance record in the array
                const index = state.maintenanceRecords.findIndex(record => record._id === action.payload._id);
                if (index !== -1) {
                    state.maintenanceRecords[index] = action.payload; // Replace with the updated record
                }
            })
            .addCase(updateMaintenance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export the async thunks
export { addMaintenance, deleteMaintenance, fetchMaintenance, updateMaintenance };

// Export the reducer
export default maintainSlice.reducer;
