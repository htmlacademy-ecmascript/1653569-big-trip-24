import InfoView from './view/info-view.js';
import FilterView from './view/filter-view.js';
import MainPresenter from './presenter/main-presenter.js';
import { render, RenderPosition } from './render.js';

const infoElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const mainElement = document.querySelector('.trip-events');
const mainPresenter = new MainPresenter(mainElement);

render(new InfoView(), infoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterElement);

mainPresenter.init();
