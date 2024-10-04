import SortPresenter from './sort-presenter.js';
import PointPresenter from './point-presenter.js';
import AddPointPresenter from './add-point-presenter.js';
import PointListView from '../view/point-list-view.js';
import MessageView from '../view/message-view.js';
import { sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils/point.js';
import { SortType, FilterType, UserAction, UpdateType } from '../const.js';
import { remove, render } from '../framework/render.js';
import { filter } from '../utils/filter.js';

export default class PointsPresenter {
  #mainContainer = null;
  #pointsModel = [];
  #offersModel = [];
  #destinationsModel = [];
  #filtersModel = [];

  #sortPresenter = null;
  #pointPresenters = new Map();
  #addPointPresenter = null;
  #headerPresenter = null;
  #pointListComponent = new PointListView();
  #messageComponent = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isAddPointFormOpened = false;

  constructor({mainContainer, pointsModel, offersModel, destinationsModel, filterModel, headerPresenter}) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filtersModel = filterModel;
    this.#headerPresenter = headerPresenter;

    this.#addPointPresenter = new AddPointPresenter({
      pointListContainer: this.#pointListComponent.element,
      offersPoint: this.#offersModel.offers,
      destinationsPoint: this.#destinationsModel.destinations,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#addPointDestroyHandler,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filtersModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.toSorted(sortPointsByDay);
      case SortType.TIME:
        return filteredPoints.toSorted(sortPointsByTime);
      case SortType.PRICE:
        return filteredPoints.toSorted(sortPointsByPrice);
      default:
        return this.#pointsModel.points;
    }
  }

  init() {
    this.#renderApp();
  }

  renderAddPointForm = () => {
    this.#isAddPointFormOpened = true;
    this.#currentSortType = SortType.DAY;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#headerPresenter.disableButton();
    this.#addPointPresenter.init();
  };

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      mainContainer: this.#mainContainer,
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    this.#sortPresenter.init();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderApp() {
    if (!this.points.length && !this.#isAddPointFormOpened) {
      this.#renderMessage();
      return;
    }

    this.#renderSort();
    render(this.#pointListComponent, this.#mainContainer);
    this.#renderPoints();
  }

  #clearApp({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#sortPresenter.remove();
    this.#addPointPresenter.destroy();

    if (this.#messageComponent){
      remove(this.#messageComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderMessage() {
    this.#messageComponent = new MessageView({
      filterType: this.#filterType
    });
    render(this.#messageComponent, this.#mainContainer);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearApp();
    this.#renderApp();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearApp();
        this.#renderApp();
        break;
      case UpdateType.MAJOR:
        this.#clearApp({resetSortType: true});
        this.#renderApp();
        break;
    }
  };

  #addPointDestroyHandler = () => {
    this.#isAddPointFormOpened = false;
    this.#headerPresenter.enableButton();
    if (!this.points.length) {
      this.#clearApp();
      this.#renderApp();
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    this.#addPointPresenter.destroy();
  };
}
