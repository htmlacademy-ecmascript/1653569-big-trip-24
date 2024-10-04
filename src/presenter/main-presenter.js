import HeaderPresenter from '../presenter/header-presenter.js';
import FilterPresenter from '../presenter/filter-presenter.js';
import PointsPresenter from '../presenter/points-presenter.js';
import PointsModel from '../model/points-model.js';
import OffersModel from '../model/offers-model.js';
import DestinatonsModel from '../model/destinations-model.js';
import FilterModel from '../model/filters-model.js';

const headerElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinatonsModel();
const filterModel = new FilterModel();

const headerPresenter = new HeaderPresenter({
  headerContainer: headerElement
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterElement,
  filterModel,
  pointsModel
});

const pointsPresenter = new PointsPresenter({
  mainContainer: mainElement,
  headerPresenter: headerPresenter,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel
});

export default class MainPresenter {
  init() {
    headerPresenter.init({renderAddPointForm: pointsPresenter.renderAddPointForm});
    filterPresenter.init();
    pointsPresenter.init();
  }
}
