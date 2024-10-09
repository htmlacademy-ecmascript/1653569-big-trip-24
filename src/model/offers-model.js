import Observable from '../framework/observable.js';
import { showErrorMessage } from '../utils/common.js';

export default class OffersModel extends Observable {
  #offers = [];
  #pointsApiSevrice = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiSevrice = pointsApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#pointsApiSevrice.offers;
    } catch (error) {
      this.#offers = [];
      showErrorMessage('offers');
    }
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type) ?? [];
  }
}
