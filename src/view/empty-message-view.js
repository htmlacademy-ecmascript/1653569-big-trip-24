import AbstractView from '../framework/view/abstract-view';

function createEmptyMessageView(message) {
  return (
    `<p class="trip-events__msg">${message}</p>`
  );
}

export default class EmptyMessageView extends AbstractView {
  #message = null;

  constructor ({message}) {
    super();
    this.#message = message;
  }

  get template() {
    return createEmptyMessageView(this.#message);
  }
}
