import InfoView from '../view/info-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import NoPointView from '../view/no-point-view.js';
import { render, replace, RenderPosition} from '../framework/render.js';
import { EditType } from '../const.js';

export default class MainPresenter {
  #pointListComponent = new PointListView();
  #mainContainer = null;
  #infoContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #points = [];

  constructor({mainContainer, infoContainer, pointsModel, offersModel, destinationsModel}) {
    this.#mainContainer = mainContainer;
    this.#infoContainer = infoContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#renderApp();
  }

  #renderPoint({point, offers, destination, editType = EditType.EDIT}) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      offers,
      destination,
      onRollupButtonClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPointView({
      point,
      offers,
      destination,
      editType,
      onRollupButtonClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(editPointComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#pointListComponent.element);
  }

  #renderApp() {
    if (!this.#points.length) {
      render(new NoPointView(), this.#mainContainer);
      return;
    }
    render(new InfoView(), this.#infoContainer, RenderPosition.AFTERBEGIN);
    render(new SortView(), this.#mainContainer);
    render(this.#pointListComponent, this.#mainContainer);
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint({
        point: this.#points[i],
        offers: this.#offersModel.getOffersByType(this.#points[i].type),
        destination: this.#destinationsModel.getDestinationById(this.#points[i].destination)
      });
    }
  }
}
