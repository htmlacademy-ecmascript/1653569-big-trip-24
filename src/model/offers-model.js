import { mockOffers } from '../mock/offers';

export default class OffersModel {
  offers = mockOffers;

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    return this.offers.find((offer) => offer.type === type) ?? [];
  }
}
