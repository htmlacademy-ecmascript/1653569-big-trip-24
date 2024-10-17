import InfoPresenter from './info-presenter.js';
import AddPointButtonPresenter from './add-point-button-presenter.js';
import FilterPresenter from '../presenter/filter-presenter.js';
import PointsPresenter from '../presenter/points-presenter.js';
import PointsModel from '../model/points-model.js';
import OffersModel from '../model/offers-model.js';
import DestinatonsModel from '../model/destinations-model.js';
import FilterModel from '../model/filters-model.js';
import PointsApiService from '../service/points-api-service.js';
import { AUTHTORIZATOIN, END_POINT } from '../utils/const.js';

const headerElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-events');

const pointsApiService = new PointsApiService(END_POINT, AUTHTORIZATOIN);

const filterModel = new FilterModel();
const offersModel = new OffersModel({pointsApiService});
const destinationsModel = new DestinatonsModel({pointsApiService});
const pointsModel = new PointsModel({
  pointsApiService,
  offersModel,
  destinationsModel,
});

const infoPresenter = new InfoPresenter({
  headerContainer: headerElement,
  pointsModel,
  offersModel,
  destinationsModel,
});

const addPointButtonPresenter = new AddPointButtonPresenter({
  headerContainer: headerElement
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterElement,
  filterModel,
  pointsModel,
});

const pointsPresenter = new PointsPresenter({
  mainContainer: mainElement,
  addPointButtonPresenter,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel,
});

export default class MainPresenter {
  init() {
    addPointButtonPresenter.init({renderAddPointForm: pointsPresenter.renderAddPointForm});
    filterPresenter.init();
    pointsPresenter.init();
    pointsModel.init();
    infoPresenter.init();
  }
}
