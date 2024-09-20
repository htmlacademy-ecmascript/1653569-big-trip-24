import InfoView from '../view/info-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #infoComponent = new InfoView();

  constructor ({headerContainer}) {
    this.#headerContainer = headerContainer;
  }

  init() {
    render(this.#infoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }
}
