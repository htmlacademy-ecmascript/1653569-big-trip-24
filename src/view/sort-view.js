import { SortType, Attribute } from '../const';
import { capitalizedString } from '../utils';
import { createElement } from '../render';

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
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${getSortAttribute(type)}>
      <label class="trip-sort__btn" for="sort-${type}">${capitalizedString(type)}${type === 'offer' ? 's' : ''}</label>
    </div>`
  );
}

const sorting = Object.values(SortType).map((type) => getSortItemTemplate(type)).join('');

function createSortTemplate() {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${sorting}</form>`;
}

export default class SortView {
  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
