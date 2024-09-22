import AbstractView from '../framework/view/abstract-view.js';
import { capitalizedString } from '../utils/common.js';
import { SortType, Attribute } from '../const.js';

function getSortAttribute(type) {
  switch (type) {
    case SortType.DAY:
      return Attribute.CHECKED;
    case SortType.EVENT:
    case SortType.OFFER:
      return Attribute.DISABLED;
    default:
      return '';
  }
}

function getSortItemTemplate(type) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" data-sort-type="${type}" name="trip-sort" value="sort-${type}" ${getSortAttribute(type)}>
      <label class="trip-sort__btn" for="sort-${type}">${capitalizedString(type)}${type === 'offer' ? 's' : ''}</label>
    </div>`
  );
}

function createSortTemplate() {
  const sorting = Object.values(SortType).map((type) => getSortItemTemplate(type)).join('');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${sorting}</form>`;
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#setEventListener();
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #setEventListener() {
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.target.checked = true;
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
