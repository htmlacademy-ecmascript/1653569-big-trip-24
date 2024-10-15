import InfoView from '../view/info-view.js';
import { remove, render, replace, RenderPosition } from '../framework/render.js';
import { DESTINATIONS_COUNT, Symbol, DateFormat } from '../utils/const.js';
import { getOffersTotal, getOffersChecked, convertDate, sortPointsByDay } from '../utils/point.js';

export default class InfoPresenter {
  #headerContainer = null;
  #infoComponent = null;
  #pointsModel = [];
  #sortedPoints = [];
  #offersModel = [];
  #destinationsModel = [];

  constructor({headerContainer, pointsModel, offersModel, destinationsModel}) {
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  #route() {
    const destinationNames = this.#sortedPoints
      .map((point) => this.#destinationsModel.destinations
        .find((destination) => destination.id === point.destination).name);

    const route = destinationNames.length > DESTINATIONS_COUNT
      ? [destinationNames.at(0), Symbol.ELLIPSES, destinationNames.at(-1)]
      : destinationNames;
    return route.join(Symbol.SEPARATOR);
  }

  #duration() {
    const startDate = convertDate(this.#sortedPoints.at(0).dateFrom, DateFormat.ROUTE);
    const endDate = convertDate(this.#sortedPoints.at(-1).dateTo, DateFormat.ROUTE);
    return `${startDate}${Symbol.SEPARATOR}${endDate}`;
  }

  #total() {
    return this.#pointsModel.points
      .reduce((total, point) => total + point.basePrice + getOffersTotal(point.offers, getOffersChecked(this.#offersModel.offers, point.type)), 0);
  }

  init() {
    if (!this.#pointsModel.points.length) {
      this.destroy();
      return;
    }

    this.#sortedPoints = this.#pointsModel.points.toSorted(sortPointsByDay);
    const prevInfoComponent = this.#infoComponent;
    this.#infoComponent = new InfoView({
      route: this.#route(),
      duration: this.#duration(),
      total: this.#total(),
    });

    if (!prevInfoComponent) {
      render(this.#infoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
    render(this.#infoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    remove(this.#infoComponent);
  }

  #handleModelEvent = () => this.init();
}
