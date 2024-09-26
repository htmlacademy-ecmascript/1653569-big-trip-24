import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { remove, render, replace } from '../framework/render.js';
import { EditType, Mode } from '../const.js';

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #handlePointTypeChange = null;
  #handlePointDestinationChange = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #offersPoint = null;
  #destinationPoint = null;
  #editType = null;

  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onDataChange, onModeChange, onPointTypeChange, onPointDestinationChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#handlePointTypeChange = onPointTypeChange;
    this.#handlePointDestinationChange = onPointDestinationChange;
  }

  init({point, offersPoint, destinationPoint, editType = EditType.EDIT}) {
    this.#point = point;
    this.#offersPoint = offersPoint;
    this.#destinationPoint = destinationPoint;
    this.#editType = editType;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offersPoint: this.#offersPoint,
      destinationPoint: this.#destinationPoint,
      onRollupButtonClick: this.#handleRollupButtonClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      offersPoint: this.#offersPoint,
      destinationPoint: this.#destinationPoint,
      editType: this.#editType,
      onRollupButtonClick: this.#handleRollupButtonClick,
      onFormSubmit: this.#handleFormSubmit,
      onPointTypeChange: this.#handlePointTypeChange,
      onPointDestinationChange: this.#handlePointDestinationChange
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
      this.#editPointComponent.reset(this.#point, this.#offersPoint, this.#destinationPoint);
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
      this.#editPointComponent.reset(this.#point, this.#offersPoint);
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleRollupButtonClick = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.reset(this.#point, this.#offersPoint, this.#destinationPoint);
      this.#replaceFormToPoint();
      return;
    }
    this.#replacePointToForm();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
