import InfoView from '../view/info-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class HeaderPresenter {
  #headerContainer = null;

  constructor ({headerContainer}) {
    this.#headerContainer = headerContainer;
  }

  init() {
    render(new InfoView(), this.#headerContainer, RenderPosition.AFTERBEGIN);
  }
}
