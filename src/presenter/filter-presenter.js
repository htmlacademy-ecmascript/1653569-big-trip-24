import FilterView from '../view/filter-view.js';
import { render } from '../framework/render.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filters = [];

  constructor({filterContainer, filters}) {
    this.#filterContainer = filterContainer;
    this.#filters = filters;
  }

  init() {
    render(new FilterView({
      items: this.#filters
    }), this.#filterContainer);
  }
}
