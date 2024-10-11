// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { fetchCars } from '../slices/carsSlice';
import { deleteRent, fetchRents, updateRent, updateRentStatus } from '../slices/rentsSlice';
import '../styles/rents.css';


const RentTable = () => {
    const dispatch = useDispatch();
    const { rents, loading, error } = useSelector((state) => state.rents);
    const { cars } = useSelector((state) => state.cars)
    const [updatingRentId, setUpdatingRentId] = useState(null);
    const [editedRent, setEditedRent] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // State for search input


    const handleStatusClick = (rent) => {
        const newStatus = rent.status === 'ongoing' ? 'completed' : 'ongoing';
        setUpdatingRentId(rent._id);
        dispatch(updateRentStatus({ rentId: rent._id, newStatus }))
            .finally(() => setUpdatingRentId(null));
    };



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
        setEditedRent(rent);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update the search term based on input
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedRent((prevRent) => ({ ...prevRent, [name]: value }));
    };


    const handleSave = () => {
        try {
            if (editedRent) {
                const { _id, ...updates } = editedRent; // Extract _id and updates
                dispatch(updateRent({ _id, ...updates })); // Use _id here
                setEditedRent(null);
                dispatch(fetchRents());
            }
        } catch (error) {
            console.error('Error updating rent:', error);
        }
    };

    const filteredRents = searchTerm ? rents.filter((rent) => {
        const searchValue = searchTerm.toLowerCase();
        return (
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

    // so we are creating a workbook and then transfering my datainto json then bind the data to my book and may give it a name
    //This line writes the workbook (which now contains your data as a sheet) into an actual file and initiates a download on the user's device
    const handleExport = () => {

        const workbook = XLSX.utils.book_new();
        const DataJson = XLSX.utils.json_to_sheet(filteredRents)
        const RentFileXLSX = XLSX.utils.book_append_sheet(workbook, DataJson, "RentData")
        XLSX.writeFile(workbook, 'RentFileXLSX')

    };


    if (loading) {
        return <p>Loading rents...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

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
                        <th>Name</th>
                        <th>National ID</th>
                        <th>Car Model</th>
                        <th>Car Plate</th>
                        <th>Rent Date</th>
                        <th>Return Date</th>
                        <th>Kilos Before Rent</th>
                        <th>Total Price</th>
                        <th>Paid</th>
                        <th>Remaining</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRents.map((rent) => (
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
                                        className='inputEdit'
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
