import { App } from "../App.jsx";
import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class CarsService {
  async removeCar(id) {
    const res = await api.delete(`api/cars/${id}`);
    logger.log("[REMOVING CAR]", res.data);
    AppState.cars = AppState.cars.filter((car) => car.id != id);
    // let index = AppState.cars.findIndex((car) => car.id == id);
    // logger.log("[REMOVED CAR INDEX]", index);
    // AppState.cars.splice(index);
  }
  async editCar(carData, carId) {
    const res = await api.put(`api/cars/${carId}`, carData);
    logger.log("[EDITING CAR]", res.data);
    let index = AppState.cars.findIndex((car) => car.id == carId);
    AppState.cars.splice(index, 1, new Car(res.data));
  }
  async createCar(carData) {
    debugger;
    const res = await api.post("api/cars", carData);
    logger.log("[CREATING CAR]", res.data);
    AppState.cars.push(new Car(res.data));
  }
  async getCars() {
    const res = await api.get("api/cars");
    console.log(
      "[GOT CARS]",
      res.data.map((car) => new Car(car))
    );
    AppState.cars = res.data.map((car) => new Car(car));
  }
}

export const carsService = new CarsService();
