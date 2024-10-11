import React from 'react';
import UnknownCars from '../media/UnknownCar.png';


export default function UnknownCar() {
    return (
        <div key="unknownCar-1" className="CarModel" id="AddCarModel">
            <img
                src={UnknownCars}
                alt="Add a new car"
                className="ViewDetailsAddCardImage"
            />
            <div className="carData">
                <div className="PriceDetails">
                    <div className="ViewDetailsAddCard" id="ViewDetailsAddCard">
                        Add Car
                    </div>
                </div>
            </div>
        </div>
    )
}
