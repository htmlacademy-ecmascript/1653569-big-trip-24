import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import EmptyMessageView from '../view/empty-message-view.js';
import PointPresenter from './point-presenter.js';
import HeaderPresenter from './header-presenter.js';
import { render } from '../framework/render.js';
import { EmptyMessage } from '../const.js';
import { updateItem } from '../utils/common.js';

export default class MainPresenter {
  #mainContainer = null;
  #headerContainer = null;
  #pointsModel = [];
  #offersModel = [];
  #destinationsModel = [];

  #sortComponent = new SortView();
  #pointListComponent = new PointListView();

  #points = [];
  #pointPresenters = new Map();

  constructor({mainContainer, headerContainer, pointsModel, offersModel, destinationsModel}) {
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#renderApp();
  }

  #renderHeader() {
    const headerPresenter = new HeaderPresenter({
      headerContainer: this.#headerContainer
    });
    headerPresenter.init();
  }

  #renderSort() {
    render(this.#sortComponent, this.#mainContainer);
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#mainContainer);
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

  #renderApp() {
    if (!this.#points.length) {
      this.#renderEmptyMessage();
      return;
    }
    this.#renderHeader();
    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints();
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
}
