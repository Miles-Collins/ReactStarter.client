import PropTypes from 'prop-types';
import React from "react";
import { AppState } from "../AppState";
import { Car } from "../models/Car"
import { carsService } from "../services/CarsService";
import Pop from "../utils/Pop";
import './Styles/CarCard.scss'

/**@param {{car:Car}} props */
export default function CarCard({car}) {

  async function removeCar() {
    try {
      const yes = await Pop.confirm(`Do you want to delete the ${car.year} ${car.make} ${car.model}?`)
      if(!yes) {return}
      await carsService.removeCar(car.id)
    } catch (error) {
      console.error(error)
     // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

function setActiveCar() {
  AppState.activeCar = car
}

  return (
    <div className="card car-card">
      <img src={car.imgUrl} alt="" srcSet="" data-bs-toggle="modal" data-bs-target="#carModal" className="selectable" onClick={setActiveCar} />
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <p><b>{car.year} {car.make} {car.model}</b></p>
          <div className={AppState.activeCar?.id == car.id ? "d-flex justify-content-between" : "d-none"}>
            <button className="btn ms-1" type="button" onClick={removeCar} title="Delete Car!"><span>✖️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

CarCard.propTypes = {
  car: PropTypes.instanceOf(Car)
}