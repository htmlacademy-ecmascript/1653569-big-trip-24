import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalizedFirstChar } from '../utils/common.js';
import { EditType, EventType, Attribute, DateFormat } from '../const.js';
import { convertDate } from '../utils/point.js';

const BLANK_POINT = {
  id: null,
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: EventType.FLIGHT
};

function createEditPointEventTypeTemplate(pointType) {
  return (
    Object.values(EventType).map((type) => (
      `<div class="event__type-item">
        <input
          id="event-type-${type}-1"
          class="event__type-input visually-hidden"
          type="radio"
          name="event-type"
          value="${type}"
          ${type === pointType ? Attribute.CHECKED : ''}
        >
        <label
          class="event__type-label event__type-label--${type}"
          for="event-type-${type}-1">
          ${capitalizedFirstChar(type)}
        </label>
      </div>`
    )).join('')
  );
}

function createEditPointOfferContainerTemplate(offersTemplate) {
  if (offersTemplate) {
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offersTemplate}
        </div>
      </section>`
    );
  }
  return '';
}

function createEditPointOfferTemplate (offers, offersPoint = []) {
  if (offersPoint.length) {
    return offersPoint.map(({title, price, id}) => {
      const offerClassName = title.split(' ').findLast((word) => word.length > 3).toLowerCase();
      return (
        `<div class="event__offer-selector">
          <input
            class="event__offer-checkbox visually-hidden"
            id="event-offer-${offerClassName}-1"
            type="checkbox"
            name="event-offer-${offerClassName}"
            ${offers.includes(id) ? Attribute.CHECKED : ''}
          >
          <label
            class="event__offer-label"
            for="event-offer-${offerClassName}-1">
            <span class="event__offer-title">${title}</span>
            +€&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`
      );
    }).join('');
  }
  return '';
}

function createEditPointDestinationTemplate(destinationPoint) {
  if (destinationPoint) {
    return (
      destinationPoint.pictures.length
        ? `${destinationPoint.description}
          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${destinationPoint.pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}"></img>`).join('')}
            </div>
          </div>`
        : destinationPoint.description
    );
  }
  return '';
}

function createEditPointDestinationContainerTemplate(destinationTemplate) {
  if (destinationTemplate) {
    return (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationTemplate}</p>
      </section>`
    );
  }
  return '';
}

function createEditPointButtonNegativeTemplate(editType) {
  return (
    editType === EditType.ADD
      ? '<button class="event__reset-btn" type="reset">Cancel</button>'
      : `<button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`
  );
}

function createEditPointTemplate(state, editType) {
  const {basePrice, offers, dateFrom, dateTo, type, offersPoint, destinationPoint} = state;

  const dateStart = convertDate(dateFrom, DateFormat.EDIT_POINT);
  const dateEnd = convertDate(dateTo, DateFormat.EDIT_POINT);
  const eventTypesTemplate = createEditPointEventTypeTemplate(type);
  const offersTemplate = createEditPointOfferTemplate(offers, offersPoint);
  const offersContainerTemplate = createEditPointOfferContainerTemplate(offersTemplate);
  const destinationTemplate = createEditPointDestinationTemplate(destinationPoint);
  const destinationContainerTemplate = createEditPointDestinationContainerTemplate(destinationTemplate);
  const titleLabelTemplate = capitalizedFirstChar(type);
  const titleInputTemplate = destinationPoint ? destinationPoint.name : '';
  const basePriceTemplate = editType === EditType.EDIT ? basePrice : 0;
  const buttonNegativeTemplate = createEditPointButtonNegativeTemplate(editType);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypesTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${titleLabelTemplate}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${titleInputTemplate}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
            —
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePriceTemplate}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          ${buttonNegativeTemplate}
        </header>

        <section class="event__details">
          ${offersContainerTemplate}
          ${destinationContainerTemplate}
        </section>
      </form>
    </li>`
  );
}

export default class EditPointView extends AbstractStatefulView {
  #point = null;
  #offersPoint = null;
  #destinationPoint = null;
  #editType = null;
  #handleRollupButtonClick = null;
  #handleFormSubmit = null;
  #handlePointTypeChange = null;
  #handlePointDestinationChange = null;

  constructor({
    point = BLANK_POINT,
    offersPoint,
    destinationPoint,
    editType,
    onRollupButtonClick,
    onFormSubmit,
    onPointTypeChange,
    onPointDestinationChange
  }) {
    super();
    this.#point = point;
    this.#offersPoint = offersPoint;
    this.#destinationPoint = destinationPoint;
    this.#editType = editType;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handlePointTypeChange = onPointTypeChange;
    this.#handlePointDestinationChange = onPointDestinationChange;
    this._setState(EditPointView.parsePointToState(this.#point, this.#offersPoint.offers, this.#destinationPoint));
    this.#setEventListeners();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#editType);
  }

  reset(point, offersPoint, destinationPoint, basePrice) {
    this.updateElement(EditPointView.parsePointToState(point, offersPoint.offers, destinationPoint, basePrice));
  }

  _restoreHandlers() {
    this.#setEventListeners();
  }

  #setEventListeners() {
    if (this.#editType === EditType.EDIT) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#rollupButtonClickHandler);
    }

    this.element
      .querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__type-list')
      .addEventListener('change', this.#pointTypeChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#pointDestinationChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#pointPriceChangeHandler);
  }

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint({
      ...this._state,
      offers: this._state.offersPoint.map((offer) => offer.id),
      destination: this._state.destinationPoint.id
    }));
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      offersPoint: this.#handlePointTypeChange(evt.target.value).offers,
      type: evt.target.value
    });
  };

  #pointDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destinationPoint: this.#handlePointDestinationChange(evt.target.value)
    });
  };

  #pointPriceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: evt.target.value
    });
  };

  static parsePointToState(point, offersPoint, destinationPoint) {
    return {
      ...point,
      offersPoint,
      destinationPoint
    };
  }

  static parseStateToPoint(state) {
    if (!state.offersPoint) {
      state.offersPoint = [];
    }

    if (!state.destinationPoint) {
      state.destinationPoint = null;
    }

    delete state.offersPoint;
    delete state.destinationPoint;

    return state;
  }
}
