import EditPointView from '../view/edit-point-view.js';
import { EditMode, UserAction, UpdateType } from '../utils/const.js';
import { RenderPosition, render, remove } from '../framework/render.js';

export default class AddPointPresenter {
  #destinationsModel = null;
  #offersModel = null;
  #addPointComponent = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({destinationsModel, offersModel, onDataChange, onDestroy}) {
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init({pointListContainer}) {
    if (this.#addPointComponent) {
      return;
    }

    this.#addPointComponent = new EditPointView({
      offersPoint: this.#offersModel.offers,
      destinationsPoint: this.#destinationsModel.destinations,
      editMode: EditMode.ADD,
      onFormSubmit: this.#handleFormSubmit,
      onFormCancelReset: this.#handleFormCancelReset
    });

    render(this.#addPointComponent, pointListContainer, RenderPosition.AFTERBEGIN);
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

  setSaving() {
    this.#addPointComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#addPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };
    this.#addPointComponent.shake(resetFormState);
  }

  #handleFormCancelReset = () => {
    this.destroy();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange (
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
