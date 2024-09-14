import AbstractView from '../framework/view/abstract-view.js';
import { capitalizedString } from '../utils.js';
import { FilterType, Attribute } from '../const.js';

function getFilterAttribute(filter) {
  switch (filter) {
    case FilterType.EVERYTHING:
      return Attribute.CHECKED;
    default:
      return '';
  }
}

function getFilterItemTemplate(filter) {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${getFilterAttribute(filter)}>
      <label class="trip-filters__filter-label" for="filter-${filter}">${capitalizedString(filter)}</label>
    </div>`
  );
}

function createFilterTemplate() {
  const filtering = Object.values(FilterType).map((filter) => getFilterItemTemplate(filter)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtering}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}
