import Observable from '../framework/observable.js';
import { FilterType } from '../utils/const.js';


export default class FilersModel extends Observable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
