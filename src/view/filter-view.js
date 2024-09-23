import ItemListView from './item-list-view.js';
import { capitalizedFirstChar } from '../utils/common.js';
import { FilterType, Attribute } from '../const.js';

function getFilterItemTemplate(filter) {
  const { type, count } = filter;
  return (
    `<div class="trip-filters__filter">
      <input
      id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio" name="trip-filter"
      value="${type}"
      ${type === FilterType.EVERYTHING ? Attribute.CHECKED : ''}
      ${count === 0 ? Attribute.DISABLED : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${capitalizedFirstChar(type)}</label>
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
