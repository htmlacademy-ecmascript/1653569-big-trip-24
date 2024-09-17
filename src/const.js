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
  OFFER: 'offer'
};

const Attribute = {
  CHECKED: 'checked',
  DISABLED: 'disabled'
};

const DateFormat = {
  DAY: 'MMM D',
  TIME: 'hh:mm',
  FULL: 'YYYY-MM-DD',
  POINT: 'DD,HH,mm',
  EDIT_POINT: 'DD/MM/YY HH:mm'
};

const EditType = {
  ADD: 'add',
  EDIT: 'edit'
};

const EmptyMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now'
};

export { EventType, SortType, FilterType, Attribute, DateFormat, EditType, EmptyMessage};
