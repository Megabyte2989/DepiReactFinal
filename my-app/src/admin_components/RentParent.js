import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import RentForm from './RentForm'
import RentTable from './RentTable'

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
