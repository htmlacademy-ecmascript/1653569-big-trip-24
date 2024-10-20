import AbstractView from '../framework/view/abstract-view.js';
import { capitalizedFirstChar } from '../utils/common.js';
import { convertDate, convertDuration} from '../utils/point.js';
import { DateFormat } from '../utils/const.js';

function createPointTitleTempate(destination, type) {
  const title = capitalizedFirstChar(type);
  return (
    destination
      ? `${title} ${destination.name}`
      : `${title}`
  );
}

function createPointOffersTemplate(offersPoint, offers) {
  if (offersPoint.offers) {
    const filteredOffers = offersPoint.offers.filter((offer) => offers.includes(offer.id));
    return (
      filteredOffers.map(({title, price}) => (
        `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </li>`)).join('')
    );
  }
  return '';
}

function createPointTemplate(point, offersPoint, destinationPoint) {
  const {basePrice, dateFrom, dateTo, offers, isFavorite, type} = point;

  const date = convertDate(dateFrom, DateFormat.DAY);
  const timeStart = convertDate(dateFrom, DateFormat.TIME);
  const timeEnd = convertDate(dateTo, DateFormat.TIME);
  const dateStart = convertDate(dateFrom, DateFormat.FULL);
  const dateEnd = convertDate(dateTo, DateFormat.FULL);
  const duration = convertDuration(dateFrom, dateTo);

  const titleTemplate = createPointTitleTempate(destinationPoint, type);
  const offersTemplate = createPointOffersTemplate(offersPoint, offers);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateStart}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${titleTemplate}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStart}T${timeStart}">${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateEnd}T${timeEnd}">${timeEnd}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
           ${offersTemplate}
        </ul>
        <button class="${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class PointView extends AbstractView {
  #point = null;
  #offersPoint = null;
  #destinationPoint = null;
  #handleRollupButtonClick = null;
  #handleFavoriteClick = null;

  constructor({point, offersPoint, destinationPoint, onRollupButtonClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#offersPoint = offersPoint;
    this.#destinationPoint = destinationPoint;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#setEventListeners();
  }

  get template() {
    return createPointTemplate(this.#point, this.#offersPoint, this.#destinationPoint);
  }

  #setEventListeners() {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupButtonClickHandler);

    this.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
