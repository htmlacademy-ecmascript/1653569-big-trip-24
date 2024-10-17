import Observable from '../framework/observable.js';
import { ApiEndpoint } from '../utils/const.js';

export default class DestinatonsModel extends Observable {
  #destinations = [];
  #pointsApiSevrice = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiSevrice = pointsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#pointsApiSevrice.destinations;
    } catch {
      throw new Error(ApiEndpoint.DESTINATIONS);
    }
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id) ?? '';
  }
}
