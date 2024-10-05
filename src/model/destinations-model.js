import { mockDestinations } from '../mock/destinations';

export default class DestinatonsModel {
  #destinations = mockDestinations;

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id) ?? '';
  }
}
