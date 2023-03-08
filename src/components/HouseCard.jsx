import  PropTypes  from "prop-types";
import React from 'react';
import { AppState } from "../AppState";
import { House } from "../models/House";
import { housesService } from "../services/HousesService";
import Pop from "../utils/Pop";
import './Styles/HouseCard.scss'

/**@param {{house:House}} props */
export default function HouseCard({house}) {

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

  function setActive() {
    AppState.activeHouse = house
  }

  return (

    <div onClick={setActive} className="card">
      <div className="card-header text-end">
        <button onClick={remove} className="selectable" title="Delete House!">✖️</button>
      </div>
      <img className="selectable houseCard" src={house.imgUrl} alt="" srcSet="" />
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