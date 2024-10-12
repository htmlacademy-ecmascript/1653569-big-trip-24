import SortPresenter from './sort-presenter.js';
import PointPresenter from './point-presenter.js';
import AddPointPresenter from './add-point-presenter.js';
import PointListView from '../view/point-list-view.js';
import EmptyPointListView from '../view/empty-point-list-view.js';
import LoadingView from '../view/loading-view.js';
import ErrorView from '../view/error-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils/point.js';
import { SortType, FilterType, UserAction, UpdateType } from '../const.js';
import { remove, render } from '../framework/render.js';
import { filter } from '../utils/filter.js';

const TimeLimit = {
  LOWER: 350,
  UPPER: 1000,
};
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
  #loadingComponent = new LoadingView();
  #errorComponent = new ErrorView();
  #emptyPointListComponent = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isAddPointForm = false;
  #isLoading = true;
  #isError = false;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER,
    upperLimit: TimeLimit.UPPER
  });

  constructor({mainContainer, pointsModel, offersModel, destinationsModel, filterModel, headerPresenter}) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filtersModel = filterModel;
    this.#headerPresenter = headerPresenter;

    this.#addPointPresenter = new AddPointPresenter({
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleAddPointDestroy,
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
    this.#isAddPointForm = true;
    this.#currentSortType = SortType.DAY;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#headerPresenter.disableButton();
    this.#addPointPresenter.init({pointListContainer: this.#pointListComponent.element});
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

  #renderPointList() {
    render(this.#pointListComponent, this.#mainContainer);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderEmptyPointList() {
    this.#emptyPointListComponent = new EmptyPointListView({
      filterType: this.#filterType
    });
    remove(this.#pointListComponent);
    render(this.#emptyPointListComponent, this.#mainContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#mainContainer);
  }

  #renderError() {
    render(this.#errorComponent, this.#mainContainer);
  }

  #renderApp() {
    if (this.#isLoading) {
      this.#headerPresenter.disableButton();
      this.#renderLoading();
      return;
    }

    if (this.#isError) {
      this.#headerPresenter.disableButton();
      this.#renderError();
      return;
    }

    if (!this.points.length && !this.#isAddPointForm) {
      this.#headerPresenter.enableButton();
      this.#renderEmptyPointList();
      return;
    }

    this.#headerPresenter.enableButton();
    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints();
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#addPointPresenter.destroy();
  }

  #clearApp({resetSortType = false} = {}) {
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

    this.#clearPoints();
    this.#sortPresenter.remove();
    remove(this.#loadingComponent);
    remove(this.#emptyPointListComponent);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints();
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#addPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (error) {
          this.#addPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderApp();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#isError = true;
        this.#renderApp();
        break;
    }
  };

  #handleAddPointDestroy = () => {
    this.#isAddPointForm = false;
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
