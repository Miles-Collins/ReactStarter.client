import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from "react";
import { AppState } from "../AppState";
import HouseCard from "../components/HouseCard";
import HouseForm from "../components/HouseForm";
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

  async function sellHouse() {
    try {
      logger.log('Sold car')
    }
    catch (error){
      Pop.error(error);
    }
  }

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
        <div className="row">
          <div className="col-12 text-end">
            <button className="btn btn-dark" title="Sell House" onClick={sellHouse} data-bs-target="#houseModal" data-bs-toggle="modal">
              Sell House
            </button>
          </div>
        </div>
      </div>

     {/* BOOTSTRAP MODAL */}
      <div className="modal fade" id="houseModal" tabIndex={-1} role="dialog" aria-labelledby="houseModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                      <h5 className="modal-title" id="modalTitleId">House Form</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                  <div className="container-fluid">
                  <HouseForm />
                  </div>
              </div>
            </div>
        </div>
      </div>
    
  )

}
export default observer(HousePage)