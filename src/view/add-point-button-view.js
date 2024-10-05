import AbstractView from '../framework/view/abstract-view.js';

function createAddPointButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class AddPointButtonVeiw extends AbstractView {
  #handleAddPointButtonClick = null;

  constructor({onAddPointButtonClick}) {
    super();
    this.#handleAddPointButtonClick = onAddPointButtonClick;
    this.#setEventListener();
  }

  get template() {
    return createAddPointButtonTemplate();
  }

  setDisabled(isDisabled) {
    this.element.disabled = isDisabled;
  }

  #setEventListener() {
    this.element
      .addEventListener('click', this.#addPointButtonClickHandler);
  }

  #addPointButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleAddPointButtonClick();
  };
}
