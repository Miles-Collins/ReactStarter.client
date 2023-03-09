import { observer } from "mobx-react-lite";
import React from 'react';
import { AppState } from "../AppState";
import { House } from "../models/House";
import { housesService } from "../services/HousesService";
import { BindEditable } from "../utils/FormHandler";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

function HouseForm() {
  let editable = { ...AppState.activeHouse || new House({})}
  const bindEditable = BindEditable(editable)

  async function handleSubmit() {
    try {
    if(window.event) {
    window.event.preventDefault()
    logger.log("HouseForm  editable:", editable);
    editable.id 
    ? await housesService.edit(editable, editable.id) 
    : await housesService.create(editable)
    if(editable.id) {
      Pop.success('House edited.')
    } else {
      Pop.success("House created.")
    }
    AppState.activeHouse = null
    logger.log("handleSubmit  AppState.activeHouse:", AppState.activeHouse);
    }
    } catch (error) {
      logger.error(error)
     // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

  return (

    <form onSubmit={handleSubmit} key={editable.id}>
      <div className="modal-body">

    <div className="mb-1">
      <label htmlFor="bedrooms">Bedrooms</label>
      <input required type="number" defaultValue={editable.bedrooms} className="form-control" id="bedrooms" name="bedrooms" placeholder="Bedrooms..." onChange={bindEditable} />
    </div>

    <div className="mb-1">
      <label htmlFor="bathrooms">Bathrooms</label>
      <input required type="number" defaultValue={editable.bathrooms} className="form-control" id="bathrooms" name="bathrooms" placeholder="Bathrooms..." onChange={bindEditable} />
    </div>

    <div className="mb-1">
      <label htmlFor="description">Description</label>
      <input required type="text" defaultValue={editable.description} className="form-control" id="description" name="description" placeholder="Description..." onChange={bindEditable} />
    </div>

    <div className="mb-1">
      <label htmlFor="levels">House Image</label>
      <input required type="text" defaultValue={editable.houseImg} className="form-control" id="houseImg" name="houseImg" placeholder="Image Url..." onChange={bindEditable} />
    </div>

    <div className="mb-1">
      <label htmlFor="levels">House Levels</label>
      <input required type="text" defaultValue={editable.levels} className="form-control" id="levels" name="levels" placeholder="House Levels..." onChange={bindEditable} />
    </div>

    <div className="mb-1">
      <label htmlFor="price">Price</label>
      <input required type="number" defaultValue={editable.price} className="form-control" id="price" name="price" placeholder="Price..." onChange={bindEditable} />
    </div>

    <div className="mb-1">
      <label htmlFor="levels">Year</label>
      <input required type="number" defaultValue={editable.year} className="form-control" id="year" name="year" placeholder="Year..." onChange={bindEditable} />
    </div>
    
    <div className="modal-footer">
      <button type="submit" data-bs-dismiss="modal" className="btn btn-dark">
        Submit
      </button>
    </div>

      </div>
    </form>
  )

}

export default observer(HouseForm)