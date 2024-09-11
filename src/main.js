import InfoView from './view/info-view.js';
import FilterView from './view/filter-view.js';
import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinatonsModel from './model/destinations-model.js';
import { render, RenderPosition } from './render.js';

const infoElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinatonsModel();
const mainPresenter = new MainPresenter({mainContainer: mainElement, pointsModel, offersModel, destinationsModel});

render(new InfoView(), infoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterElement);

mainPresenter.init();
