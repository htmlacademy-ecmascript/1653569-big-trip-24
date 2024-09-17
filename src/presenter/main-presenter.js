import InfoView from '../view/info-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import EmptyMessageView from '../view/empty-message-view.js';
import { render, replace, RenderPosition} from '../framework/render.js';
import { EditType, EmptyMessage } from '../const.js';

export default class MainPresenter {
  #pointListComponent = new PointListView();
  #mainContainer = null;
  #infoContainer = null;
  #pointsModel = [];
  #offersModel = [];
  #destinationsModel = [];
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
      render(new EmptyMessageView({message: EmptyMessage.EVERYTHING}), this.#mainContainer);
      return;
    }
    render(new InfoView(), this.#infoContainer, RenderPosition.AFTERBEGIN);
    render(new SortView(), this.#mainContainer);
    render(this.#pointListComponent, this.#mainContainer);
    this.#points.forEach((point) => {
      const { type, destination } = point;
      this.#renderPoint({
        point: point,
        offers: this.#offersModel.getOffersByType(type),
        destination: this.#destinationsModel.getDestinationById(destination)
      });
    });
  }
}
