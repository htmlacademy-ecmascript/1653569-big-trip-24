import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
dayjs.extend(utc);
dayjs.extend(duration);

const capitalizedString = (string) => string.replace(string[0], string[0].toUpperCase());
const convertDate = (date, format) => date ? dayjs(date).utc().format(format) : '';
const getEventDuration = (eventStart, eventEnd) => (dayjs.duration(dayjs(eventEnd).set('seconds', 0).set('millisecond', 0).diff(dayjs(eventStart).set('seconds', 0).set('millisecond', 0)))).format('DD,HH,mm');
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export { capitalizedString, convertDate, getEventDuration, getRandomArrayElement };
