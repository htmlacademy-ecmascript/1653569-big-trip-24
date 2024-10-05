import ItemListView from './item-list-view.js';
import { capitalizedFirstChar } from '../utils/common.js';
import { Attribute } from '../const.js';

function getFilterItemTemplate({type, isChecked, isDisabled}) {
  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        data-item="${type}"
        value="filter-${type}"
        ${isChecked ? Attribute.CHECKED : ''}
        ${isDisabled ? Attribute.DISABLED : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${type}">
        ${capitalizedFirstChar(type)}
      </label>
    </div>`
  );
}

function createFilterTemplate(filters) {
  const filtering = filters.map((filter) => getFilterItemTemplate(filter)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtering}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends ItemListView {

  get template() {
    return createFilterTemplate(this._items);
  }
}
