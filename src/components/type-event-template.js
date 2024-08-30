import { capitalizedString } from '../utils';

export const getTypeEventTemplate = (type) => (
  ` <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizedString(type)}</label>
  </div>`
);
