import HeaderPresenter from '../presenter/header-presenter.js';
import FilterPresenter from '../presenter/filter-presenter.js';
import PointsPresenter from '../presenter/points-presenter.js';
import PointsModel from '../model/points-model.js';
import OffersModel from '../model/offers-model.js';
import DestinatonsModel from '../model/destinations-model.js';
import FilterModel from '../model/filters-model.js';
import PointsApiService from '../service/points-api-service.js';

const AUTHTORIZATOIN = 'Basic 2rHj3c1Jlz0Ks36';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

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
  destinationsModel
});

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
    pointsModel.init();
  }
}
