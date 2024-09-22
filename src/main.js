import HeaderPresenter from './presenter/header-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinatonsModel from './model/destinations-model.js';
import { generateFilter } from './mock/filter.js';

const headerElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinatonsModel();
const filters = generateFilter(pointsModel.points);

const headerPresenter = new HeaderPresenter({
  headerContainer: headerElement
});
const filterPresenter = new FilterPresenter({
  filterContainer: filterElement,
  filters
});
const pointsPresenter = new PointsPresenter({
  mainContainer: mainElement,
  pointsModel,
  offersModel,
  destinationsModel
});

headerPresenter.init();
filterPresenter.init();
pointsPresenter.init();
