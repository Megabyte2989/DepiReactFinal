// src/slices/ordersSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// Create async thunk for fetching orders
const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await axios.get('https://depi-react-final.vercel.app/api/orders'); // Fetch orders from the API
    return response.data; // Return the fetched data
});
// Create async thunk for adding an order
const addOrder = createAsyncThunk('orders/addOrder', async (orderData) => {
    const response = await axios.post('https://depi-react-final.vercel.app/api/orders/add', orderData); // Post new order to the API
    return response.data; // Return the newly added order
});

export const callOrder = createAsyncThunk('orders/callOrder', async (orderId) => {
    const response = await axios.patch(`https://depi-react-final.vercel.app/api/orders/${orderId}`, { status: 'Called' });
    return response.data;
});


// Create async thunk for accepting an order
const acceptOrder = createAsyncThunk('orders/acceptOrder', async (orderId) => {
    const response = await axios.put(`https://depi-react-final.vercel.app/api/orders/accept/${orderId}`); // Accept the order in the API
    return response.data; // Return the accepted order
});
// Create async thunk for deleting an order
const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId) => {
    await axios.delete(`https://depi-react-final.vercel.app/api/orders/${orderId}`); // Delete the order by ID
    return orderId; // Return the orderId to use in the fulfilled case
});
// Define the initial state for orders
const initialState = {
    orders: [], // Array to hold orders
    loading: false, // Loading state for async operations
    error: null, // Error state to capture any errors during async operations
};
// Create orders slice
const ordersSlice = createSlice({
    name: 'orders', // Name of the slice
    initialState, // Initial state defined above
    reducers: {}, // No additional reducers
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true; // Set loading to true when fetching orders
                state.error = null; // Reset error state
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false once orders are fetched
                state.orders = action.payload; // Update the orders with the fetched data
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.orders.push(action.payload); // Add the new order to the list
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(order => order._id !== action.payload); // Remove the deleted order
            })
            .addCase(callOrder.fulfilled, (state, action) => {
                const updatedOrders = state.orders.map(order =>
                    order._id === action.payload._id ? action.payload : order
                );
                state.orders = updatedOrders;
            })

    },
});
// Export the async thunks for use in components
export { acceptOrder, addOrder, deleteOrder, fetchOrders };
export default ordersSlice.reducer;