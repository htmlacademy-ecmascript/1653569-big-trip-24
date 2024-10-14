import SortView from '../view/sort-view.js';
import { render, remove } from '../framework/render.js';
import { SortType } from '../utils/const.js';

export default class SortPresenter {
  #mainContainer = null;
  #handleSortTypeChange = null;
  #sortComponent = null;
  #sorters = [];

  constructor({mainContainer, currentSortType, onSortTypeChange}) {
    this.#mainContainer = mainContainer;
    this.#handleSortTypeChange = onSortTypeChange;
    this.#sorters = Object.values(SortType).map((type) => ({
      type,
      isChecked: type === currentSortType,
      isDisabled: type === SortType.EVENT || type === SortType.OFFERS
    }));
  }

  init() {
    this.#sortComponent = new SortView({
      items: this.#sorters,
      onItemChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#mainContainer);
  }

  remove() {
    remove(this.#sortComponent);
  }
}
