import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { remove, render, replace } from '../framework/render.js';
import { EditMode as EditMode, Mode, UserAction, UpdateType } from '../const.js';
import { isDatesEqual } from '../utils/point.js';

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #offersModel = null;
  #destinationsModel = null;

  #mode = Mode.DEFAULT;

  constructor({pointListContainer, destinationsModel, offersModel, onDataChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offersPoint: this.#offersModel.getOffersByType(point.type),
      destinationPoint: this.#destinationsModel.getDestinationById(point.destination),
      onRollupButtonClick: this.#handleRollupButtonClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      offersPoint: this.#offersModel.offers,
      destinationsPoint: this.#destinationsModel.destinations,
      editMode: EditMode.EDIT,
      onRollupButtonClick: this.#handleRollupButtonClick,
      onFormSubmit: this.#handleFormSubmit,
      onFormResetDelete: this.#handleFormResetDelete,
    });

    if (!prevPointComponent || !prevEditPointComponent) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleRollupButtonClick = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
      return;
    }
    this.#replacePointToForm();
  };

  #handleFormSubmit = (point) => {
    const isMinorUpdate = !isDatesEqual(this.#point.dateFrom, point.dateFrom)
      || !isDatesEqual(this.#point.dateTo, point.dateTo)
      || this.#point.basePrice !== point.basePrice;

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      point
    );
    this.#replaceFormToPoint();
  };

  #handleFormResetDelete = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };
}
