import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { AppState } from "../AppState.js";
import CarCard from "../components/CarCard";
import CarForm from "../components/CarForm.jsx";
import { carsService } from "../services/CarsService";
import Pop from "../utils/Pop";

function HomePage() {

  async function getCars() {
    try {
      console.log("GETTING CARS");
      await carsService.getCars();
    } catch (error) {
      console.error(error)
      Pop.error(('[ERROR]'), error.message)
    }
  }

  async function createCar() {
    try {
      console.log("CREATING CAR");
    } catch (error) {
      console.error(error)
     // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

  let cars = (AppState.cars.map(c => {
    return (
      <div className="col-md-4 my-3" key={c.id}>
        <CarCard car={c}/>
      </div>
    )
  }))

useEffect(() => {
  getCars()
}, [])

/////////// HTML \\\\\\\\\\\\\\

  return (
    <div className="home-page">
      <div className="container-fluid my-3">
        <div className="row">
          {cars}
        </div>
      </div>
      <div className="row sticky-bottom">
        <div className="col-12 text-end">
          <button className="btn btn-dark" title="Sell Car" onClick={createCar} data-bs-toggle="modal" data-bs-target="#carModal">
            Create Car
          </button>
        </div>
      </div>
    

    {/* BOOTSTRAP MODAL */}
    <div className="modal fade" id="carModal" tabIndex={-1} role="dialog" aria-labelledby="carModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="modalTitleId">Car Form</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            <div className="container-fluid">
            {AppState.activeCar ? <CarForm /> : <CarForm />}
            </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default observer(HomePage)