import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';
import { SortType } from '../const.js';

export default class SortPresenter {
  #mainContainer = null;
  #handleSortTypeChange = null;
  #sortTypes = [];

  constructor({mainContainer, onSortTypeChange}) {
    this.#mainContainer = mainContainer;
    this.#handleSortTypeChange = onSortTypeChange;
    this.#sortTypes = Object.values(SortType).map((type) => ({
      type,
      isChecked: type === SortType.DAY,
      isDisabled: type === SortType.EVENT || type === SortType.OFFERS
    }));
  }

  init() {
    render(new SortView({
      items: this.#sortTypes,
      onItemChange: this.#handleSortTypeChange,
    }), this.#mainContainer);
  }
}
