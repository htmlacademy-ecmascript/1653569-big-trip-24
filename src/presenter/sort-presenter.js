import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';

export default class SortPresenter {
  #mainContainer = null;
  #handleSortTypeChange = null;

  constructor({mainContainer, onSortTypeChange}) {
    this.#mainContainer = mainContainer;
    this.#handleSortTypeChange = onSortTypeChange;
  }

  init() {
    render(new SortView({onSortTypeChange: this.#handleSortTypeChange}), this.#mainContainer);
  }
}
