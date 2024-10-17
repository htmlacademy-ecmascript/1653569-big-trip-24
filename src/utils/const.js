const AUTHTORIZATOIN = 'Basic 2rHj3c1lz0K36';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const DEFAULT_PRICE = 0;
const DESTINATIONS_COUNT = 3;

const Days = {
  IN_MOUTH: 30,
  IN_YEAR: 365,
};

const MinCount = {
  MOUTH: 0,
  YEAR: 1
};

const Symbol = {
  SEPARATOR: '&nbsp;&mdash;&nbsp;',
  ELLIPSES: '&hellip;',
};

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
  ROUTE: 'D MMM',
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
  [ApiEndpoint.POINTS]: 'Failed to load latest route information,<br><b>points</b> are unavailable',
  [ApiEndpoint.OFFERS]: 'Failed to load latest route information,<br><b>offers</b> are unavailable',
  [ApiEndpoint.DESTINATIONS]: 'Failed to load latest route information,<br><b>destinations</b> are unavailable',
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
  DEFAULT_PRICE,
  DESTINATIONS_COUNT,
  BLANK_POINT,
  Days,
  MinCount,
  Milliseconds,
  Symbol,
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
