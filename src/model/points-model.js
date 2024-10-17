import Observable from '../framework/observable.js';
import PointsAdapterService from '../service/points-adapter-service.js';
import { UpdateType, ErrorMessage, ApiEndpoint } from '../utils/const.js';

export default class PointsModel extends Observable {
  #points = [];
  #offersModel = [];
  #destiationModel = [];
  #pointsApiSevrice = null;
  #pointsAdapterService = new PointsAdapterService();

  constructor({pointsApiService, offersModel, destinationsModel}) {
    super();
    this.#pointsApiSevrice = pointsApiService;
    this.#offersModel = offersModel;
    this.#destiationModel = destinationsModel;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      await Promise.all([this.#offersModel.init(), this.#destiationModel.init()]);
      try {
        const points = await this.#pointsApiSevrice.points;
        this.#points = points.map(this.#pointsAdapterService.adaptToClient);
        this._notify(UpdateType.INIT);
      } catch {
        this._notify(UpdateType.ERROR, ApiEndpoint.POINTS);
      }
    } catch (error) {
      this._notify(UpdateType.ERROR, error.message);
    }
  }

  async updatePoint(updateType, update) {
    try {
      const response = await this.#pointsApiSevrice.updatePoint(update);
      const updatedPoint = this.#pointsAdapterService.adaptToClient(response);
      this.#points = this.#points.map((point) => point.id === update.id ? updatedPoint : point);
      this._notify(updateType, updatedPoint);
    } catch (error) {
      throw new Error(ErrorMessage.UPDATE);
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiSevrice.addPoint(update);
      const newPoint = this.#pointsAdapterService.adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, update);
    } catch (error) {
      throw new Error(ErrorMessage.ADD);
    }
  }

  async deletePoint(updateType, update) {
    try {
      await this.#pointsApiSevrice.deletePoint(update);
      this.#points = this.#points.filter((point) => point.id !== update.id);
      this._notify(updateType);
    } catch (error) {
      throw new Error(ErrorMessage.DELETE);
    }
  }
}
