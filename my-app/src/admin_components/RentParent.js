import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux/store.js'
import RentForm from './RentForm.js'
import RentTable from './RentTable.js'

// Rent Page Parent that will hold hte form and the table
export default function RentParent() {
    return (
        <Provider store={store}>
            <div className="MainSection" id="MainSection">
                <div className="container">
                    <h2>Recent Rents</h2>
                    <div className="RentTableHolder">
                        <table id="RentTable">
                            <RentTable />
                            <RentForm />
                        </table>
                    </div>
                </div>
            </div>
        </Provider>
    )
}
