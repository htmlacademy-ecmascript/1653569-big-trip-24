const AUTHTORIZATOIN = 'Basic 2rHj3c1lz0Ks36';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const MIN_MONTH_COUNT = 0;
const DAYS_IN_MONTH = 30;
const CHAR_DAY = 'D';

const DEFAULT_PRICE = 0;
const WORD_LENGTH = 3;

const Milliseconds = {
  IN_HOUR: 3600000,
  IN_DAY: 86400000
};

const EventType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const BLANK_POINT = {
  basePrice: DEFAULT_PRICE,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: EventType.FLIGHT
};

const DateFormat = {
  DAY: 'MMM DD',
  TIME: 'HH:mm',
  FULL: 'YYYY-MM-DD',
  IN_DAYS: 'DD[D] HH[H] mm[M]',
  IN_HOURS: 'HH[H] mm[M]',
  IN_MINUTES: 'mm[M]',
};

const EditMode = {
  ADD: 'ADD',
  EDIT: 'EDIT',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const FilterMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const ApiEndpoint = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

const LoadingMessage = {
  LOADING: 'Loading...',
  [ApiEndpoint.OFFERS]: 'Failed to load latest route information,<br>offers are unavailable',
  [ApiEndpoint.DESTINATIONS]: 'Failed to load latest route information,<br>destinations are unavailable',
};

const ErrorMessage = {
  UPDATE: 'Can\'t update point',
  ADD: 'Can\'t add point',
  DELETE: 'Can\'t delete point',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR',
};

const TimeLimit = {
  LOWER: 350,
  UPPER: 1000,
  REMOVE: 3000,
};

export {
  AUTHTORIZATOIN,
  END_POINT,
  MIN_MONTH_COUNT,
  DAYS_IN_MONTH,
  CHAR_DAY,
  DEFAULT_PRICE,
  WORD_LENGTH,
  BLANK_POINT,
  Milliseconds,
  EventType,
  SortType,
  FilterType,
  DateFormat,
  EditMode,
  Mode,
  FilterMessage,
  LoadingMessage,
  ErrorMessage,
  Method,
  ApiEndpoint,
  UserAction,
  UpdateType,
  TimeLimit,
};
