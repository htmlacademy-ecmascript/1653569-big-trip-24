import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render } from '../render.js';

export default class MainPresenter {
  pointListComponent = new PointListView();

  constructor(container) {
    this.mainContainer = container;
  }

  init() {
    render(new SortView(), this.mainContainer);
    render(this.pointListComponent, this.mainContainer);
    render(new EditPointView(), this.pointListComponent.getElement());
    for (let i = 1; i <= 3; i++) {
      render(new PointView(), this.pointListComponent.getElement());
    }
  }
}
