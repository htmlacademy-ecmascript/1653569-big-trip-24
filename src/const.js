const EventType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const Attribute = {
  CHECKED: 'checked',
  DISABLED: 'disabled'
};

const DateFormat = {
  DAY: 'MMM DD',
  TIME: 'HH:mm',
  FULL: 'YYYY-MM-DD',
  IN_DAYS: 'DD[D] HH[H] mm[M]',
  IN_HOURS: 'HH[H] mm[M]',
  IN_MINUTES: 'mm[M]'
};

const EditMode = {
  ADD: 'ADD',
  EDIT: 'EDIT'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const Message = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now'
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
  INIT: 'INIT'
};

export {
  EventType,
  SortType,
  FilterType,
  Attribute,
  DateFormat,
  EditMode,
  Mode,
  Message,
  UserAction,
  UpdateType
};
