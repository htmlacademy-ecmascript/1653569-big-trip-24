import Observable from '../framework/observable.js';
import { ApiEndpoint } from '../utils/const.js';

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
      throw new Error(ApiEndpoint.OFFERS);
    }
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type) ?? [];
  }
}
