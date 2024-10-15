// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { fetchCars } from '../slices/carsSlice.js';
import { deleteRent, fetchRents, updateRent, updateRentStatus } from '../slices/rentsSlice.js';
import '../styles/rents.css';

// Main States selection and redux and hooks
const RentTable = () => {
    const dispatch = useDispatch();
    const { rents, loading, error } = useSelector((state) => state.rents);
    const { cars } = useSelector((state) => state.cars)
    const [updatingRentId, setUpdatingRentId] = useState(null);
    const [editedRent, setEditedRent] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');


    // fucntion that handle the status and dispatch the UpdateRents status
    // which will adjust the rent row to switch it between 
    //completed and on going 
    const handleStatusClick = (rent) => {
        const newStatus = rent.status === 'ongoing' ? 'completed' : 'ongoing';
        setUpdatingRentId(rent._id);
        dispatch(updateRentStatus({ rentId: rent._id, newStatus })) // dispatch the updatestatus
            .finally(() => setUpdatingRentId(null)); // reset the state for future use
    };

    const sortRents = (rents) => {
        // If no sortColumn is specified, return the original rents array unmodified

        if (!sortColumn) return rents;

        // Create a shallow copy of the rents array to avoid mutating the original array during sorting
        // no mutation allowed in react
        return [...rents].sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            // Check if the sortColumn is related to dates (rentDate or returnDate)
            // Convert date strings to Date objects and compare them

            if (sortColumn === 'rentDate' || sortColumn === 'returnDate') {
                return sortOrder === 'asc' ? new Date(aValue) - new Date(bValue) : new Date(bValue) - new Date(aValue);
            }


            // For numerical values, compare them directly
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            }

            return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });
    };



    // sort handler function to put on the table tr
    const handleSort = (column) => {
        const newOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(newOrder);
    };

    // delete handler for all tables that usees sweet alert 2
    const handleDelete = (rentId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteRent(rentId));
                Swal.fire(
                    'Deleted!',
                    'The rent has been deleted.',
                    'success'
                );
            }
        });
    };

    useEffect(() => {
        dispatch(fetchCars());

    }, [dispatch]);



    const handleEdit = (rent) => {
        setEditedRent(rent); // update the rent term based ont he input

    };


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update the search term based on input
    };


    // update the ui change based on the states
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedRent((prevRent) => ({ ...prevRent, [name]: value }));
    };


    //  handle the save function that will be dispatching the update rent 
    // and then fetch the rents to update the ui with the new rents after
    // updating
    const handleSave = () => {
        try {
            if (editedRent) {
                const { _id, ...updates } = editedRent; // Extract _id and updates
                dispatch(updateRent({ _id, ...updates })); // Use _id here
                setEditedRent(null);

            }
        } catch (error) {
            console.error('Error updating rent:', error);
        }
        dispatch(fetchRents());
    };


    // filtering function that will return the rent data based on
    // the filtering conditions
    const filteredRents = searchTerm ? rents.filter((rent) => {
        const searchValue = searchTerm.toLowerCase();
        return (
            // lowercase and then .includes (the serach term) to compare them
            rent.customerName?.toLowerCase().includes(searchValue) ||
            rent.nationalId?.toLowerCase().includes(searchValue) ||
            rent.carModel?.toLowerCase().includes(searchValue) ||
            String(rent.kilosBeforeRent).includes(searchValue) ||
            String(rent.totalPrice).includes(searchValue) ||
            String(rent.paid).includes(searchValue) ||
            rent.carPlate?.toLowerCase().includes(searchValue)
        );
    }) : rents; // If searchTerm is empty, show all rents

    useEffect(() => {
        dispatch(fetchRents());
    }, [dispatch]);

    // function for exporting table files
    // so we are creating a workbook and then transfering my datainto json then bind the data to my book and may give it a name
    //This line writes the workbook (which now contains your data as a sheet) into an actual file and initiates a download on the user's device
    const handleExport = () => {

        const workbook = XLSX.utils.book_new();
        const DataJson = XLSX.utils.json_to_sheet(filteredRents)
        XLSX.utils.book_append_sheet(workbook, DataJson, "RentData")
        XLSX.writeFile(workbook, 'RentFileXLSX')

    };


    // for loading return the loading ui
    if (loading) {
        return <p>Loading rents...</p>;
    }

    // for error return the error ui

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    const sortedRents = sortRents(filteredRents);

    return (

        <>  <div className="controls">
            <input
                type="text"
                id="searchInputRent"
                placeholder="🔍 Search Rents"
                value={searchTerm} // Bind the input value to the search term state
                onChange={handleSearchChange} // Call handleSearchChange on input change
            />
            <button onClick={handleExport} className="export-btn">Export <i className="fas fa-file-export"></i></button>
        </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('customerName')}>Name <i className="fas fa-sort"></i></th>
                        <th onClick={() => handleSort('nationalId')}>National ID <i className="fas fa-sort"></i></th>
                        <th>Car Model</th>
                        <th onClick={() => handleSort('carPlate')}>Car Plate <i className="fas fa-sort"></i></th>
                        <th onClick={() => handleSort('rentDate')}>Rent Date <i className="fas fa-sort"></i></th>
                        <th onClick={() => handleSort('returnDate')}>Return Date <i className="fas fa-sort"></i></th>
                        <th onClick={() => handleSort('kilosBeforeRent')}>Kilos Before Rent <i className="fas fa-sort"></i></th>
                        <th onClick={() => handleSort('totalPrice')}>Total Price <i className="fas fa-sort"></i></th>
                        <th onClick={() => handleSort('paid')}>Paid <i className="fas fa-sort"></i></th>
                        <th onClick={() => handleSort('remaining')}>Remaining <i className="fas fa-sort"></i></th>
                        <th onClick={() => handleSort('status')}>Status <i className="fas fa-sort"></i></th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {/* map through the sortedRents we made
                    general thing that we will see
                    if we are on the editing mode we will return the 
                    text inputs to start the updating methods 
                    if not we will return the data as it is */}
                    {sortedRents.map((rent) => (
                        <tr key={rent._id}>
                            <td>
                                {editedRent && editedRent._id === rent._id ? (
                                    <input
                                        type="text"
                                        name="customerName"
                                        value={editedRent.customerName}
                                        onChange={handleInputChange}
                                        className='inputEdit'
                                    />
                                ) : (
                                    rent.customerName
                                )}
                            </td>
                            <td>
                                {editedRent && editedRent._id === rent._id ? (
                                    <input
                                        type="text"
                                        name="nationalId"
                                        value={editedRent.nationalId}
                                        onChange={handleInputChange}
                                        className='inputEdit'
                                    />
                                ) : (
                                    rent.nationalId
                                )}
                            </td>
                            <td>
                                {editedRent && editedRent._id === rent._id ? (
                                    <input
                                        type="text"
                                        name="carModel"
                                        value={editedRent.carId.model}
                                        onChange={handleInputChange}
                                        className='inputEdit'
                                    />
                                ) : (

                                    rent.carName
                                )}
                            </td>
                            <td>
                                {editedRent && editedRent._id === rent._id ? (
                                    <select
                                        type="text"
                                        name="carPlate"
                                        value={editedRent.carPlate}
                                        onChange={handleInputChange}
                                        className='inputEdit selectRentInput'
                                    >
                                        <option value="" disabled>Select a car plate</option>
                                        {cars.map(car => (
                                            <option key={car._id} value={car.carPlate}>
                                                {car.carName} ({car.carPlate})
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    rent.carPlate
                                )}
                            </td>
                            <td>
                                {editedRent && editedRent._id === rent._id ? (
                                    <input
                                        type="datetime-local"
                                        name="rentDate"
                                        value={new Date(editedRent.rentDate).toISOString().slice(0, 16)} // Convert to YYYY-MM-DDTHH:MM
                                        onChange={handleInputChange}
                                        className='inputEdit'
                                    />
                                ) : (
                                    new Date(rent.rentDate).toLocaleString() // Display date and time
                                )}
                            </td>
                            <td>
                                {editedRent && editedRent._id === rent._id ? (
                                    <input
                                        type="datetime-local"
                                        name="returnDate"
                                        value={new Date(editedRent.returnDate).toISOString().slice(0, 16)} // Convert to YYYY-MM-DDTHH:MM
                                        onChange={handleInputChange}
                                        className='inputEdit'
                                    />
                                ) : (
                                    new Date(rent.returnDate).toLocaleString() // Display date and time
                                )}
                            </td>
                            <td>
                                {editedRent && editedRent._id === rent._id ? (
                                    <input
                                        type="number"
                                        name="kilosBeforeRent"
                                        value={editedRent.kilosBeforeRent}
                                        onChange={handleInputChange}
                                        className='inputEdit'
                                    />
                                ) : (
                                    rent.kilosBeforeRent
                                )}
                            </td>
                            <td>
                                {editedRent && editedRent._id === rent._id ? (
                                    <input
                                        type="number"
                                        name="totalPrice"
                                        value={editedRent.totalPrice}
                                        onChange={handleInputChange}
                                        className='inputEdit'
                                    />
                                ) : (
                                    rent.totalPrice
                                )}
                            </td>
                            <td>
                                {editedRent && editedRent._id === rent._id ? (
                                    <input
                                        type="number"
                                        name="paid"
                                        value={editedRent.paid}
                                        onChange={handleInputChange}
                                        className='inputEdit'
                                    />
                                ) : (
                                    rent.paid

                                )}
                            </td>
                            <td>
                                {editedRent && editedRent._id === rent._id ? (
                                    <input
                                        type="number"
                                        name="remaining"
                                        value={editedRent}
                                        onChange={handleInputChange}
                                        className='inputEdit'
                                    />
                                ) : (
                                    rent.totalPrice - rent.paid
                                )}
                            </td>
                            <td>
                                <span className={`status ${rent.status}`}>
                                    {updatingRentId === rent._id ? 'Updating...' : rent.status}
                                </span>
                            </td>
                            <td>
                                {/* put the handlers */}
                                {editedRent && editedRent._id === rent._id ? (
                                    <button className="save_btn" onClick={handleSave}>Save</button>
                                ) : (
                                    <button className="edit_btn" onClick={() => handleEdit(rent)}>Edit</button>
                                )}
                            </td>
                            <td>
                                <button className="delete_btn" onClick={() => handleDelete(rent._id)}>Delete</button>
                            </td>
                            <td>
                                <button
                                    className="assign-btn"
                                    onClick={() => handleStatusClick(rent)}
                                    disabled={updatingRentId === rent._id} // Disable button while updating
                                >
                                    {rent.status === 'ongoing' ? "Assign" : "UnAssign"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default RentTable;
