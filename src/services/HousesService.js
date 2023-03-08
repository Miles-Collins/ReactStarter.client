import { AppState } from "../AppState";
import { House } from "../models/House";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class HousesService {
  create(editable) {
    throw new Error("Method not implemented.");
  }
  async edit(editable, id) {
    const res = await api.put(`api/houses/${editable.id}`);
    logger.log("edit  res:", res.data);
    let index = AppState.houses.findIndex((house) => house.id == editable.id);
    AppState.houses.splice(index, 1, new House(res.data));
    logger.log("edit  AppState.houses:", AppState.houses);
  }
  async getHouses() {
    let res = await api.get("api/houses");
    logger.log("getHouses  res:", res.data);
    AppState.houses = res.data.map((house) => new House(house));
    logger.log("getHouses  AppState.houses:", AppState.houses);
  }

  async remove(id) {
    let res = await api.delete(`api/houses/${id}`);
    logger.log("Removing House", res.data);
    AppState.houses = AppState.houses.filter((h) => h.id != id);
  }
}

export const housesService = new HousesService();
