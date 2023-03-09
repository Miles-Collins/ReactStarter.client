import { observer } from "mobx-react-lite";
import  PropTypes  from "prop-types";
import React from 'react';
import { AppState } from "../AppState";
import { House } from "../models/House";
import { housesService } from "../services/HousesService";
import { BindEditable } from "../utils/FormHandler";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import './Styles/HouseCard.scss'

/**@param {{house:House}} props */
function HouseCard({house}) {
  const editable = {house}
  // const bindEditable = BindEditable(editable)

  async function remove() {
    try {
      const yes = await Pop.confirm("Do you want to delete this house?")
      if(!yes) {return}
      await housesService.remove(house.id)
    }
    catch (error){
      Pop.error(error);
    }
  }

  async function edit() {
    try {
      setActive()
      logger.log("HouseCard  editable:", editable);
    }
    catch (error){
      Pop.error(error);
    }
  }

  function setActive() {
    AppState.activeHouse = house
    logger.log('Setting activeHouse', house)
  }

  return (

    <div className="card">
      <div className="card-header text-end">
        <button  onClick={edit} data-bs-toggle="modal" data-bs-target="#houseModal" className="btn selectable"><span className="mdi mdi-pencil"></span></button>
        <button onClick={remove} className="selectable btn" title="Delete House!">✖️</button>
      </div>
      <img className="selectable houseCard" src={house.houseImg} alt="" srcSet="" />
      <div className="car-body">
      <div className=" my-2">
        <span className="">Bedrooms: {house.bedrooms}</span> <span className="">Bathrooms: {house.bathrooms}</span> <br/>
        <span>Price: ${house.price}</span>
      </div>
      </div>
    </div>
    
)
}

HouseCard.propTypes = {
  house: PropTypes.instanceOf(House)
}

export default observer(HouseCard)