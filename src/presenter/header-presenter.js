import InfoView from '../view/info-view.js';
import AddPointButtonView from '../view/add-point-button-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #buttonComponent = null;
  #renderAddPointForm = null;

  constructor ({headerContainer}) {
    this.#headerContainer = headerContainer;
  }

  init({renderAddPointForm}) {
    this.#renderAddPointForm = renderAddPointForm;
    this.#renderInfo();
    this.#renderAddPointButton();
  }

  disableButton() {
    this.#buttonComponent.setDisabled(true);
  }

  enableButton() {
    this.#buttonComponent.setDisabled(false);
  }

  #renderInfo() {
    render(new InfoView(), this.#headerContainer, RenderPosition.AFTERBEGIN);
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
