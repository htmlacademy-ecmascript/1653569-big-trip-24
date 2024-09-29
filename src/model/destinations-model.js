import { mockDestinations } from '../mock/destinations';

export default class DestinatonsModel {
  #destinations = mockDestinations;

  get destinations() {
    return this.#destinations;
  }

  get destinationNames() {
    return this.#destinations.map((destination) => destination.name);
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id) ?? [];
  }

  getDestinationByName(name) {
    return this.#destinations.find((destination) => destination.name === name) ?? [];
  }
}
