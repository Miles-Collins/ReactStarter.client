import { observer } from 'mobx-react-lite';
import React from 'react';
import { AppState } from "../AppState";
import { Car } from "../models/Car";
import { carsService } from "../services/CarsService";
import { BindEditable } from "../utils/FormHandler";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

function CarForm() {
const editable = { ...AppState.activeCar || new Car({})}
const bindEditable = BindEditable(editable)

async function handleSubmit() {
  try {
    // @ts-ignore
    window.event.preventDefault()
    logger.log({editable})
    editable.id 
    ? await carsService.editCar(editable, editable.id) 
    : await carsService.createCar(editable)
  } catch (error) {
    console.error(error)
   // @ts-ignore 
    Pop.error(('[ERROR]'), error.message)
  }
}
  return (

    <form onSubmit={handleSubmit} key={editable.id}>
      <div className="modal-body">

        <div className="mb-1">
          <label htmlFor="make" className="form-label">Make</label>
          <input required type="text" defaultValue={editable.make} className="form-control" id="make" placeholder="Make..." name="make" onChange={bindEditable}/>
        </div>
        
        <div className="mb-1">
          <label htmlFor="model" className="form-label">Model</label>
          <input required type="text" defaultValue={editable.model} className="form-control" id="model" placeholder="Model..." name="model" onChange={bindEditable}/>
        </div>

        <div className="mb-1">
          <label htmlFor="price" className="form-label">Price</label>
          <input required type="number" defaultValue={editable.price} className="form-control" id="price" placeholder="Price..." name="price" onChange={bindEditable}/>
        </div>
        
        <div className="mb-1">
          <label htmlFor="year" className="form-label">Year</label>
          <input required type="number" defaultValue={editable.year} className="form-control" id="year" placeholder="Year..." name="year" onChange={bindEditable}/>
        </div>

        <div className="mb-1">
          <label htmlFor="imgUrl" className="form-label">Image</label>
          <input required type="url" defaultValue={editable.imgUrl} className="form-control" id="imgUrl" placeholder="Image..." name="imgUrl" onChange={bindEditable}/>
        </div>

        <div className="mb-1">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea name="description" id="description" placeholder="Description..." className="form-control" rows={3} defaultValue={editable.description} onChange={bindEditable}></textarea>
        </div>
        
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
      </div>
    </form>

  )

}
export default observer(CarForm)