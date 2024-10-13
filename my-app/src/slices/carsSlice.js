import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state of the cars slice
const initialState = {
    cars: [], // Array to hold the list of cars
    loading: false, // Loading state for async operations
    error: null, // Error state to capture any errors during async operations
}


// Notice that the action.payload will be the return of the AsyncThunk function
// Async thunk to add a new car
const addCar = createAsyncThunk('cars/addCar', async (newCar) => {
    const response = await axios.post('http://localhost:5000/api/cars/add', newCar);
    return response.data.car; // Return the newly added car
});

// Async thunk to fetch the list of cars
const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
    const response = await axios.get('http://localhost:5000/api/cars');
    return response.data; // Return the list of cars fetched from the API
});

// Async thunk to delete a car by ID
const deleteCar = createAsyncThunk('cars/deleteCar', async (carId) => {
    await axios.delete(`http://localhost:5000/api/cars/${carId}`);
    return carId; // Return the ID of the deleted car
});

// Async thunk to update a car's details
const updateCar = createAsyncThunk('cars/updateCar', async ({ id, ...updatedData }) => {
    const response = await axios.put(`http://localhost:5000/api/cars/update/${id}`, updatedData);
    return response.data.updatedCar; // Return the updated car
});

// Create a slice of the state for cars with reducers and extra reducers for async thunks
const carSlice = createSlice({
    name: 'rent', // Name of the slice
    initialState, // Initial state defined above

    reducers: {
    },

    // Handle async actions and update the state accordingly
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.loading = true; // Set loading to true when fetching cars
                state.error = null; // Reset error state
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false once cars are fetched
                state.cars = action.payload; // Update the cars state with the fetched data
            })
            .addCase(fetchCars.rejected, (state, action) => {
                // @ts-ignore
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(deleteCar.fulfilled, (state, action) => {
                // Remove the deleted car from the state
                state.cars = state.cars.filter(car => car._id !== action.payload); // Filter out the deleted car
            })
            .addCase(updateCar.fulfilled, (state, action) => {
                // Update the car details in the state
                const index = state.cars.findIndex(car => car._id === action.payload._id); // Find the index of the car to update
                if (index !== -1) {
                    state.cars[index] = action.payload;
                }
            })
            .addCase(addCar.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCar.fulfilled, (state, action) => {
                state.loading = false;
                state.cars.push(action.payload); // Add the new car to the state
            })
            .addCase(addCar.rejected, (state, action) => {
                state.loading = false; // Set loading to false on error
                state.error = action.error.message; // Capture the error message if adding fails
            });
    }
})

// Export async thunks and reducer for use in the application
export { addCar, deleteCar, fetchCars, updateCar };
export default carSlice.reducer;