import FilterView from './view/filter-view.js';
import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinatonsModel from './model/destinations-model.js';
import { render } from './framework/render.js';
import { generateFilter } from './mock/filter.js';

const headerElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinatonsModel();
const mainPresenter = new MainPresenter({
  mainContainer: mainElement,
  headerContainer: headerElement,
  pointsModel,
  offersModel,
  destinationsModel
});

const filters = generateFilter(pointsModel.points);

render(new FilterView(filters), filterElement);

mainPresenter.init();
