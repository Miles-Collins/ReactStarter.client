import { AppState } from "../AppState";
import { House } from "../models/House";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class HousesService {
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
