import AbstractView from '../framework/view/abstract-view.js';

export default class ItemListView extends AbstractView {
  _items = [];
  _handleItemChange = null;

  constructor ({items, onItemChange}) {
    super();
    this._items = items;
    this._handleItemChange = onItemChange;
    this.#setEventListener();
  }

  #setEventListener() {
    this.element.addEventListener('change', this.#itemChangeHandler);
  }

  #itemChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this._handleItemChange?.(evt.target.dataset.item);
  };
}
