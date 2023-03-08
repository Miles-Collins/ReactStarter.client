import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from "react";
import { AppState } from "../AppState";
import HouseCard from "../components/HouseCard";
import { housesService } from "../services/HousesService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

function HousePage() {

  let houses = AppState.houses.map(house => {
    return (
      <div className="col-6 col-md-3 my-2" key={house.id}> 
      <HouseCard house={house} />
      </div>
    )
  })


  async function getHouses() {
    try {
      logger.log("getHouses  getHouses:");
      await housesService.getHouses()
    } catch (error) {
      console.error(error)
     // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

useEffect(() => { 
  getHouses()
},  [])

  return (
    <div className="HousePage">
      <div className="container-fluid">
        <div className="row">
      {houses}
      </div>
      </div>
    </div>
  )

}
export default observer(HousePage)