import AddPointButtonView from '../view/add-point-button-view.js';
import { render } from '../framework/render.js';

export default class addPointButtonPresenter {
  #headerContainer = null;
  #buttonComponent = null;
  #renderAddPointForm = null;

  constructor ({headerContainer}) {
    this.#headerContainer = headerContainer;
  }

  init({renderAddPointForm}) {
    this.#renderAddPointForm = renderAddPointForm;
    this.#renderAddPointButton();
  }

  disableButton() {
    this.#buttonComponent.setDisabled(true);
  }

  enableButton() {
    this.#buttonComponent.setDisabled(false);
  }

  #renderAddPointButton() {
    this.#buttonComponent = new AddPointButtonView({
      onAddPointButtonClick: this.#addPointButtonClickHandler
    });
    render(this.#buttonComponent, this.#headerContainer);
  }

  #addPointButtonClickHandler = () => {
    this.#renderAddPointForm();
  };
}
