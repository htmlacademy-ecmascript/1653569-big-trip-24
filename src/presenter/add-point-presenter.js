import EditPointView from '../view/edit-point-view.js';
import { EditMode, UserAction, UpdateType } from '../const';
import { render, RenderPosition, remove } from '../framework/render.js';
import { nanoid } from 'nanoid';

export default class AddPointPresenter {
  #pointListContainer = null;
  #destinationsPoint = null;
  #offersPoint = null;
  #addPointComponent = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({pointListContainer, destinationsPoint, offersPoint, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#offersPoint = offersPoint;
    this.#destinationsPoint = destinationsPoint;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#addPointComponent) {
      return;
    }

    this.#addPointComponent = new EditPointView({
      offersPoint: this.#offersPoint,
      destinationsPoint: this.#destinationsPoint,
      editMode: EditMode.ADD,
      onFormSubmit: this.#formSubmitHandler,
      onFormResetCancel: this.#formResetCancelHandler
    });

    render(this.#addPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (!this.#addPointComponent) {
      return;
    }

    remove(this.#addPointComponent);
    this.#addPointComponent = null;
    this.#handleDestroy();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #formResetCancelHandler = () => {
    this.destroy();
  };

  #formSubmitHandler = (point) => {
    this.#handleDataChange (
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point}
    );
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
