// src/admin_components/OrdersPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { deleteOrder, fetchOrders } from '../slices/ordersSlice'; // Import actions
import '../styles/OrdersPage.css'; // Import the CSS file

const OrdersPage = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(fetchOrders()); // Fetch orders when component mounts
    }, [dispatch]);



    const handleReject = (orderId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await dispatch(deleteOrder(orderId)); // Dispatch delete order
                    Swal.fire('Deleted!', 'Your order has been deleted.', 'success'); // Success message
                } catch (error) {
                    console.error('Delete order failed:', error); // Log any errors
                    Swal.fire('Error!', 'Failed to delete order.', 'error');
                }
            }
        });
    };

    if (loading) return <div className="orders-loading">Loading...</div>; // Loading state
    if (error) return <div className="orders-error">Error: {error}</div>; // Error state

    return (
        <div className="orders-page">
            <h1 className="orders-title">Orders</h1>
            {orders.length === 0 ? (
                <p className="orders-empty">No orders available.</p>
            ) : (
                <table className="orders-table">
                    <thead className="orders-thead">
                        <tr>
                            <th className="orders-header">Customer Name</th>
                            <th className="orders-header">Phone Number</th>
                            <th className="orders-header">Status</th>
                            <th className="orders-header">Created At</th>
                            <th className="orders-header">Updated At</th>
                            <th className="orders-header">Actions</th> {/* New header for actions */}
                        </tr>
                    </thead>
                    <tbody className="orders-tbody">
                        {orders.map(order => (
                            <tr className="orders-row" key={order._id}>
                                <td className="orders-cell">{order.customerName}</td>
                                <td className="orders-cell">{order.orderDetails}</td>
                                <td className="orders-cell">{order.status}</td>
                                <td className="orders-cell">{new Date(order.createdAt).toLocaleString()}</td>
                                <td className="orders-cell">{new Date(order.updatedAt).toLocaleString()}</td>
                                <td className="orders-cell"> {/* Actions cell */}
                                    {order.status === 'pending' ? (
                                        <>
                                            <button
                                                className="orders-button reject-button"
                                                onClick={() => handleReject(order._id)}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span>{order.status}</span> // Show the current status if not pending
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrdersPage;
