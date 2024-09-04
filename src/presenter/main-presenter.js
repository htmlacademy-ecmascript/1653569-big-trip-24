import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render } from '../render.js';
import { EditType } from '../const.js';

export default class MainPresenter {
  pointListComponent = new PointListView();

  constructor({mainContainer, pointsModel}) {
    this.mainContainer = mainContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.offers = [...this.pointsModel.getOffers()];
    this.destinations = [...this.pointsModel.getDestinations()];

    render(new SortView(), this.mainContainer);
    render(this.pointListComponent, this.mainContainer);
    render(new EditPointView({point: this.points[0], offers: this.offers, destinations: this.destinations, editType: EditType.EDIT}), this.pointListComponent.getElement());
    for (let i = 1; i < this.points.length; i++) {
      render(new PointView({point: this.points[i], offers: this.offers, destinations: this.destinations}), this.pointListComponent.getElement());
    }
    render(new EditPointView({point: this.points[0], offers: this.offers, destinations: this.destinations, editType: EditType.ADD}), this.pointListComponent.getElement());
  }
}
