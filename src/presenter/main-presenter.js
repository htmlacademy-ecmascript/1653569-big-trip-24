import InfoView from '../view/info-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import EmptyMessageView from '../view/empty-message-view.js';
import PointPresenter from './point-presenter.js';
import { render, RenderPosition} from '../framework/render.js';
import { EmptyMessage } from '../const.js';
import { updateItem } from '../utils/common.js';

export default class MainPresenter {
  #infoContainer = null;
  #mainContainer = null;
  #pointsModel = [];
  #offersModel = [];
  #destinationsModel = [];

  #infoComponent = new InfoView();
  #sortComponent = new SortView();
  #pointListComponent = new PointListView();

  #points = [];
  #pointPresenters = new Map();

  constructor({mainContainer, infoContainer, pointsModel, offersModel, destinationsModel}) {
    this.#mainContainer = mainContainer;
    this.#infoContainer = infoContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#renderApp();
  }

  #renderInfo() {
    render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
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

  #renderApp() {
    if (!this.#points.length) {
      render(new EmptyMessageView({message: EmptyMessage.EVERYTHING}), this.#mainContainer);
      return;
    }
    this.#renderInfo();
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
