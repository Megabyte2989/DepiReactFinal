// @ts-nocheck
// src/slices/maintainSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// Notice that the action.payload will be the return of the AsyncThunk function
// Create async thunk for fetching maintenance records
const fetchMaintenance = createAsyncThunk('maintenance/fetchMaintenance', async () => {
    const response = await axios.get('https://depi-react-final.vercel.app/api/maintenance'); // Fetch maintenance records from the API
    return response.data; // Return the fetched data
});

// Create async thunk for adding a maintenance record
const addMaintenance = createAsyncThunk('maintenance/addMaintenance', async (maintenanceData, { dispatch }) => {
    const response = await axios.post('https://depi-react-final.vercel.app/api/maintenance/add', maintenanceData); // Post new maintenance record to the API
    dispatch(fetchMaintenance()); // Refresh the list of maintenance records after adding
    return response.data; // Return the newly added maintenance record
});

// Create async thunk for deleting a maintenance record
const deleteMaintenance = createAsyncThunk('maintenance/deleteMaintenance', async (maintenanceId) => {
    await axios.delete(`https://depi-react-final.vercel.app/api/maintenance/${maintenanceId}`); // Delete the maintenance record by ID
    return maintenanceId; // Return the maintenanceId to use in the fulfilled case
});

// Create async thunk for updating a maintenance record
const updateMaintenance = createAsyncThunk('maintenance/updateMaintenance', async (maintenanceData) => {
    const { maintenanceId, ...updates } = maintenanceData; // Destructure to get maintenanceId and the rest as updates
    const response = await axios.put(`https://depi-react-final.vercel.app/api/maintenance/update/${maintenanceId}`, updates); // Update the record in the API
    return response.data; // Return the updated maintenance record
});

// Define the initial state for maintenance records
const initialState = {
    maintenanceRecords: [], // Array to hold maintenance records
    loading: false, // Loading state for async operations
    error: null, // Error state to capture any errors during async operations
};

// Create maintenance slice
const maintainSlice = createSlice({
    name: 'maintenance', // Name of the slice
    initialState, // Initial state defined above
    reducers: {

    },
    // Handle async actions and update the state accordingly
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaintenance.pending, (state) => {
                state.loading = true; // Set loading to true when fetching records
                state.error = null; // Reset error state
            })
            .addCase(fetchMaintenance.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false once records are fetched
                state.maintenanceRecords = action.payload; // Update the maintenance records with the fetched data
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
                state.loading = false; // Set loading to false once the record is deleted
                // Remove the deleted maintenance record from the state
                state.maintenanceRecords = state.maintenanceRecords.filter(
                    (record) => record._id !== action.payload // Filter out the deleted record
                );
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
                const index = state.maintenanceRecords.findIndex(record => record._id === action.payload._id); // Find the index of the record to update
                if (index !== -1) {
                    state.maintenanceRecords[index] = action.payload;
                }
            })
            .addCase(updateMaintenance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export the async thunks for use in components
// Export the reducer for the slice
export { addMaintenance, deleteMaintenance, fetchMaintenance, updateMaintenance };
export default maintainSlice.reducer;
