import Observable from '../framework/observable.js';
import { showErrorMessage } from '../utils/common.js';

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
    } catch (error) {
      this.#destinations = [];
      showErrorMessage('destinations');
    }
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id) ?? '';
  }
}
