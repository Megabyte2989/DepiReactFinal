import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    cars: [],
    loading: false,
    error: null,
}


const addCar = createAsyncThunk('cars/addCar', async (newCar) => {
    const response = await axios.post('http://localhost:5000/api/cars/add', newCar);
    return response.data.car; // Return the newly added car
});

const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
    const response = await axios.get('http://localhost:5000/api/cars');
    return response.data;
});

const deleteCar = createAsyncThunk('cars/deleteCar', async (carId) => {
    await axios.delete(`http://localhost:5000/api/cars/${carId}`);
    return carId; // Return the ID of the deleted car
});

const updateCar = createAsyncThunk('cars/updateCar', async ({ id, ...updatedData }) => {
    const response = await axios.put(`http://localhost:5000/api/cars/update/${id}`, updatedData);
    return response.data.updatedCar; // Return the updated car
});


const carSlice = createSlice({
    name: 'rent',
    initialState,

    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.loading = false;
                state.cars = action.payload;
            })

            .addCase(fetchCars.rejected, (state, action) => {
                // @ts-ignore
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(deleteCar.fulfilled, (state, action) => {
                // Remove the deleted car from the state
                state.cars = state.cars.filter(car => car._id !== action.payload);
            })

            .addCase(updateCar.fulfilled, (state, action) => {
                // Update the car details in the state
                const index = state.cars.findIndex(car => car._id === action.payload._id);
                if (index !== -1) {
                    state.cars[index] = action.payload;
                }
            })

            .addCase(addCar.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCar.fulfilled, (state, action) => {
                state.loading = false;
                state.cars.push(action.payload);
            })
            .addCase(addCar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export { addCar, deleteCar, fetchCars, updateCar };
export default carSlice.reducer
