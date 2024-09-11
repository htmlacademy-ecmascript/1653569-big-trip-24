import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render } from '../render.js';
import { EditType } from '../const.js';

export default class MainPresenter {
  pointListComponent = new PointListView();

  constructor({mainContainer, pointsModel, offersModel, destinationsModel}) {
    this.mainContainer = mainContainer;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];

    render(new SortView(), this.mainContainer);
    render(this.pointListComponent, this.mainContainer);
    render(new EditPointView({
      point: this.points[0],
      offers: this.offersModel.getOffersByType(this.points[0].type),
      destination: this.destinationsModel.getDestinationById(this.points[0].destination),
      editType: EditType.EDIT
    }), this.pointListComponent.getElement());
    for (let i = 1; i < this.points.length; i++) {
      render(new PointView({
        point: this.points[i],
        offers: this.offersModel.getOffersByType(this.points[i].type),
        destination: this.destinationsModel.getDestinationById(this.points[i].destination)
      }),this.pointListComponent.getElement());
    }
    render(new EditPointView({
      point: this.points[0],
      offers: this.offersModel.getOffersByType(this.points[0].type),
      destination: this.destinationsModel.getDestinationById(this.points[0].destination),
      editType: EditType.ADD
    }), this.pointListComponent.getElement());
  }
}
