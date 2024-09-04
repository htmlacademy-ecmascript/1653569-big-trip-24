import InfoView from './view/info-view.js';
import FilterView from './view/filter-view.js';
import PointsModel from './model/points-model.js';
import MainPresenter from './presenter/main-presenter.js';
import { render, RenderPosition } from './render.js';

const infoElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const mainPresenter = new MainPresenter({mainContainer: mainElement, pointsModel});

render(new InfoView(), infoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterElement);

mainPresenter.init();
