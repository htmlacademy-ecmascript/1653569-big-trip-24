import SortPresenter from './sort-presenter.js';
import PointPresenter from './point-presenter.js';
import AddPointPresenter from './add-point-presenter.js';
import PointListView from '../view/point-list-view.js';
import MessageView from '../view/message-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils/point.js';
import { SortType, FilterType, FilterMessage, UserAction, UpdateType, LoadingMessage, TimeLimit } from '../utils/const.js';
import { remove, render } from '../framework/render.js';
import { showErrorMessage } from '../utils/common.js';
import { filter } from '../utils/filter.js';

export default class PointsPresenter {
  #mainContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #sortPresenter = null;
  #pointPresenters = new Map();
  #addPointPresenter = null;
  #addPointButtonPresenter = null;

  #pointListComponent = new PointListView();
  #loadingComponent = new MessageView(LoadingMessage.LOADING);
  #errorComponent = new MessageView(LoadingMessage.ERROR);
  #emptyPointListComponent = new MessageView(FilterMessage.EVERYTHING);

  #currentSort = SortType.DAY;
  #currentFilter = FilterType.EVERYTHING;
  #currentError = null;
  #isAddPointForm = false;
  #isLoading = true;
  #isError = false;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER,
    upperLimit: TimeLimit.UPPER
  });

  constructor({mainContainer, pointsModel, offersModel, destinationsModel, filterModel, addPointButtonPresenter}) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;
    this.#addPointButtonPresenter = addPointButtonPresenter;

    this.#addPointPresenter = new AddPointPresenter({
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleAddPointDestroy,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#currentFilter = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#currentFilter](points);

    switch (this.#currentSort) {
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
    this.#currentSort = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#addPointButtonPresenter.disableButton();
    this.#addPointPresenter.init({pointListContainer: this.#pointListComponent.element});
  };

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      mainContainer: this.#mainContainer,
      currentSortType: this.#currentSort,
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
    this.#emptyPointListComponent = new MessageView(FilterMessage[this.#currentFilter]);
    remove(this.#pointListComponent);
    render(this.#emptyPointListComponent, this.#mainContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#mainContainer);
  }

  #renderError() {
    this.#errorComponent = new MessageView(LoadingMessage[this.#currentError]);
    render(this.#errorComponent, this.#mainContainer);
  }

  #showError(error) {
    showErrorMessage(error.message);
  }

  #renderApp() {
    if (this.#isLoading) {
      this.#addPointButtonPresenter.disableButton();
      this.#renderLoading();
      return;
    }

    if (this.#isError) {
      this.#addPointButtonPresenter.disableButton();
      this.#renderError();
      return;
    }

    if (!this.points.length && !this.#isAddPointForm) {
      this.#addPointButtonPresenter.enableButton();
      this.#renderEmptyPointList();
      return;
    }

    this.#addPointButtonPresenter.enableButton();
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
      this.#currentSort = SortType.DAY;
    }

    this.#clearPoints();
    this.#sortPresenter?.remove();
    remove(this.#loadingComponent);
    remove(this.#emptyPointListComponent);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSort === sortType) {
      return;
    }
    this.#currentSort = sortType;
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
          this.#showError(error);
        }
        break;
      case UserAction.ADD_POINT:
        this.#addPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (error) {
          this.#addPointPresenter.setAborting();
          this.#showError(error);
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
          this.#showError(error);
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
        this.#currentError = data;
        this.#renderApp();
        break;
    }
  };

  #handleAddPointDestroy = () => {
    this.#isAddPointForm = false;
    this.#addPointButtonPresenter.enableButton();
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
