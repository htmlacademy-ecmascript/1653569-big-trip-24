import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import AddPointView from '../view/add-point-view.js';
import { render } from '../render.js';
import { MAX_POINT_COUNT } from '../const.js';

export default class MainPresenter {
  pointListComponent = new PointListView();

  constructor(container) {
    this.mainContainer = container;
  }

  init() {
    render(new SortView(), this.mainContainer);
    render(this.pointListComponent, this.mainContainer);
    render(new EditPointView(), this.pointListComponent.getElement());
    for (let i = 0; i < MAX_POINT_COUNT; i++) {
      render(new PointView(), this.pointListComponent.getElement());
    }
    render(new AddPointView, this.pointListComponent.getElement());
  }
}
