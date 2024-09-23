import SortPresenter from './sort-presenter.js';
import PointPresenter from './point-presenter.js';
import PointListView from '../view/point-list-view.js';
import EmptyMessageView from '../view/empty-message-view.js';
import { sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils/point.js';
import { EmptyMessage, SortType } from '../const.js';
import { updateItem } from '../utils/common.js';
import { render } from '../framework/render.js';

export default class PointsPresenter {
  #mainContainer = null;
  #pointsModel = [];
  #offersModel = [];
  #destinationsModel = [];

  #pointListComponent = new PointListView();

  #points = [];
  #pointPresenters = new Map();
  #currentSortType = null;

  constructor({mainContainer, pointsModel, offersModel, destinationsModel}) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    if (!this.#points.length) {
      this.#renderEmptyMessage();
      return;
    }
    this.#renderSort();
    this.#renderPointList();
  }

  #renderSort() {
    const sortPresenter = new SortPresenter({
      mainContainer: this.#mainContainer,
      onSortTypeChange: this.#handleSortTypeChange
    });

    sortPresenter.init();
  }

  #sortPoints(sortType) {
    this.#currentSortType = sortType;
    switch (sortType) {
      case SortType.DAY:
        return this.#points.toSorted(sortPointsByDay);
      case SortType.TIME:
        return this.#points.toSorted(sortPointsByTime);
      case SortType.PRICE:
        return this.#points.toSorted(sortPointsByPrice);
    }
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#mainContainer);
    this.#handleSortTypeChange(SortType.DAY);
  }

  #renderPoint(props) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(props);
    this.#pointPresenters.set(props.point.id, pointPresenter);
  }

  #renderPoints() {
    this.#points.forEach((point) => {
      this.#renderPoint({
        point,
        offers: this.#offersModel.getOffersByType(point.type),
        destination: this.#destinationsModel.getDestinationById(point.destination)
      });
    });
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderEmptyMessage() {
    render(new EmptyMessageView({message: EmptyMessage.EVERYTHING}), this.#mainContainer);
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      offers: this.#offersModel.getOffersByType(updatedPoint.type),
      destination: this.#destinationsModel.getDestinationById(updatedPoint.destination)
    });
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#points = this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  };
}
