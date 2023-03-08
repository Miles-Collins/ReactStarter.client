import { action, makeAutoObservable } from "mobx";
import { isValidProp } from "./utils/isValidProp.js";

class ObservableAppState {
  user = null;
  /** @type {import('./models/Account.js').Account | null} */
  account = null;
  /** @type {import('./models/Car.js').Car[]} */
  cars = [];
  /** @type {import('./models/Car.js').Car | null} */
  activeCar = null;
  /** @type {import('./models/House.js').House[]} */
  houses = [];
  /** @type {import('./models/House.js').House | null} */
  activeHouse = null;
  /** @type {import('./models/Job.js').Job[]} */
  jobs = [];
  /** @type {import('./models/Job.js').Job | null} */
  activeJob = null;

  constructor() {
    makeAutoObservable(this);
  }
}

// eslint-disable-next-line no-undef
export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop);
    return target[prop];
  },
  set(target, prop, value) {
    isValidProp(target, prop);
    action(() => {
      target[prop] = value;
    })();
    return true;
  },
});
