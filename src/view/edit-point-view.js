import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalizedFirstChar } from '../utils/common.js';
import { BLANK_POINT, DEFAULT_PRICE, EditMode, EventType, DateFormat } from '../utils/const.js';
import { convertDate } from '../utils/point.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

function createEditPointEventTypeTemplate(pointType, isDisabled) {
  return (
    Object.values(EventType).map((type) => (
      `<div class="event__type-item">
        <input
          id="event-type-${type}-1"
          class="event__type-input visually-hidden"
          type="radio"
          name="event-type"
          value="${type}"
          ${type === pointType ? 'checked' : ''}
          ${isDisabled ? 'disabled' : ''}
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

function createEditPointOfferTemplate (offers, currentOffers, isDisabled) {
  if (currentOffers) {
    return currentOffers.map(({title, price, id}) => {
      const slug = title.split(' ').join('-').toLowerCase();
      return (
        `<div class="event__offer-selector">
          <input
            class="event__offer-checkbox visually-hidden"
            id="event-offer-${slug}"
            type="checkbox"
            name="event-offer-${slug}"
            data-offer-id="${id}"
            ${offers.includes(id) ? 'checked' : ''}
            ${isDisabled ? 'disabled' : ''}
          >
          <label
            class="event__offer-label"
            for="event-offer-${slug}">
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

function createEditPointDestinationTemplate(currentDestination) {
  if (currentDestination) {
    return (
      currentDestination.pictures.length
        ? `${currentDestination.description}
          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${currentDestination.pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}"></img>`).join('')}
            </div>
          </div>`
        : currentDestination.description
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

function createEditPointOptionsTemplate(destinationNames) {
  return destinationNames.map((destination) => `<option value="${destination}"></option>`).join('');
}

function createEditPointButtonNegativeTemplate(editMode, isDisabled, isDeleting) {
  return (
    editMode === EditMode.ADD
      ? `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}}>Cancel</button>`
      : `<button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`
  );
}

function createEditPointTemplate(state, offersPoint, destinationsPoint, editMode) {
  const {basePrice, dateFrom, dateTo, destination, offers, type, isDisabled, isSaving, isDeleting } = state;

  const currentDestination = destinationsPoint.find((destinationPoint) => destinationPoint.id === destination);
  const currentOffers = offersPoint.find((offer) => offer.type === type)?.offers;
  const destinationNames = destinationsPoint.map((destinationPoint) => destinationPoint.name);

  const dateStart = convertDate(dateFrom, DateFormat.EDIT_POINT);
  const dateEnd = convertDate(dateTo, DateFormat.EDIT_POINT);
  const eventTypesTemplate = createEditPointEventTypeTemplate(type, isDisabled);
  const offersTemplate = createEditPointOfferTemplate(offers, currentOffers, isDisabled);
  const offersContainerTemplate = createEditPointOfferContainerTemplate(offersTemplate);
  const destinationTemplate = createEditPointDestinationTemplate(currentDestination);
  const destinationContainerTemplate = createEditPointDestinationContainerTemplate(destinationTemplate);
  const eventLabelTemplate = capitalizedFirstChar(type);
  const eventOptionsTempate = createEditPointOptionsTemplate(destinationNames);
  const buttonNegativeTemplate = createEditPointButtonNegativeTemplate(editMode, isDisabled, isDeleting);
  const eventDestination = currentDestination ? currentDestination.name : '';

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypesTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${eventLabelTemplate}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${eventDestination}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">
              ${eventOptionsTempate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}" ${isDisabled ? 'disabled' : ''}>
            —
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(String(basePrice))}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
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
  #offersPoint = [];
  #destinationsPoint = [];
  #editMode = null;
  #datepickerTo = null;
  #datepickerFrom = null;
  #handleRollupButtonClick = null;
  #handleFormSubmit = null;
  #handleFormDeleteReset = null;
  #handelFormCancelReset = null;

  constructor({
    point = BLANK_POINT,
    offersPoint,
    destinationsPoint,
    editMode,
    onRollupButtonClick,
    onFormSubmit,
    onFormDeleteReset,
    onFormCancelReset
  }) {
    super();
    this.#point = point;
    this.#offersPoint = offersPoint;
    this.#destinationsPoint = destinationsPoint;
    this.#editMode = editMode;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormDeleteReset = onFormDeleteReset;
    this.#handelFormCancelReset = onFormCancelReset;
    this._setState(EditPointView.parsePointToState(this.#point));
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offersPoint, this.#destinationsPoint, this.#editMode);
  }

  reset(point) {
    this.updateElement(EditPointView.parsePointToState(point));
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  _restoreHandlers() {
    this.#setEventListeners();
    this.#setDatepickers();
  }

  #setEventListeners() {
    if (this.#editMode === EditMode.ADD) {
      this.element
        .querySelector('.event--edit')
        .addEventListener('reset', this.#formCancelClickHander);
    }

    if (this.#editMode === EditMode.EDIT) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#rollupButtonClickHandler);

      this.element
        .querySelector('.event--edit')
        .addEventListener('reset', this.#formResetDeleteHandler);
    }

    this.element
      .querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__type-list')
      .addEventListener('change', this.#pointTypeChangeHandler);

    this.element
      .querySelector('.event__available-offers')
      ?.addEventListener('change', this.#offerChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('focusin', this.#pointDestinationFocusinHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('focusout', this.#pointDestinationFocusoutHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#pointDestinationChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#pointPriceChangeHandler);
  }

  #setDatepickers() {
    const configDate = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'time_24hr': true,
      locale: {firstDayOfWeek: 1}
    };

    this.#datepickerFrom = flatpickr(
      this.element.querySelector('[name="event-start-time"]'), {
        ...configDate,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        maxDate: this._state.dateTo
      });

    this.#datepickerTo = flatpickr(
      this.element.querySelector('[name="event-end-time"]'), {
        ...configDate,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        minDate: this._state.dateFrom
      });
  }

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({ dateFrom: userDate });
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({ dateTo: userDate });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      offers: [],
      type: evt.target.value
    });
  };

  #pointDestinationFocusinHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      destinationValue: evt.target.value
    });
    evt.target.value = '';
  };

  #pointDestinationFocusoutHandler = (evt) => {
    evt.preventDefault();
    evt.target.value = this._state.destinationValue;
  };

  #pointPriceChangeHandler = (evt) => {
    evt.preventDefault();
    const price = parseInt(evt.target.value, 10);
    this._setState({
      basePrice: price > DEFAULT_PRICE ? price : DEFAULT_PRICE
    });
  };

  #formResetDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDeleteReset(EditPointView.parseStateToPoint(this._state));
  };

  #formCancelClickHander = (evt) => {
    evt.preventDefault();
    this.#handelFormCancelReset();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #offerChangeHandler = () => {
    const offersChecked = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      offers: offersChecked.map((item) => item.dataset.offerId)
    });
  };

  #pointDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    const currentDestination = this.#destinationsPoint.find((destination) => destination.name === evt.target.value);
    const currentDestinationId = currentDestination ? currentDestination.id : '';
    this.updateElement({
      destination: currentDestinationId
    });
  };

  static parsePointToState(point, offersPoint, destinationPoint) {
    return {
      ...point,
      offersPoint,
      destinationPoint,
      destinationValue: null,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
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
    delete state.destinationValue;
    delete state.isDisabled;
    delete state.isSaving;
    delete state.isDeleting;

    return state;
  }
}
