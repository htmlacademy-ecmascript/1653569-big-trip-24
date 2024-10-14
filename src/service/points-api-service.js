import { Method, ApiEndpoint } from '../utils/const.js';
import ApiService from '../framework/api-service.js';
import PointsAdapterService from './points-adapter-service.js';

export default class PointsApiService extends ApiService {
  #pointsAdapterService = new PointsAdapterService();

  get points() {
    return this._load({url: ApiEndpoint.POINTS})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: ApiEndpoint.OFFERS})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: ApiEndpoint.DESTINATIONS})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${ApiEndpoint.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#pointsAdapterService.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    return await ApiService.parseResponse(response);
  }

  async addPoint(point) {
    const response = await this._load({
      url: ApiEndpoint.POINTS,
      method: Method.POST,
      body: JSON.stringify(this.#pointsAdapterService.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    return await ApiService.parseResponse(response);
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `${ApiEndpoint.POINTS}/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }
}
