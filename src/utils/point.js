import { DateFormat } from '../const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(duration);
dayjs.extend(isBetween);

const MIN_MONTH_COUNT = 0;
const DAYS_IN_MONTH = 30;
const CHAR_DAY = 'D';

const Milliseconds = {
  IN_HOUR: 3600000,
  IN_DAY: 86400000
};

const convertDate = (date, format) => date ? dayjs(date).format(format) : '';
const getEventDiff = (start, end) => dayjs(end).diff(dayjs(start).set('second', 0).set('millisecond', 0));
const isFuturePoint = ({dateFrom}) => dayjs().isBefore(dateFrom);
const isPresentPoint = ({dateFrom, dateTo}) => dayjs(new Date()).isBetween(dateFrom, dayjs(dateTo));
const isPastPoint = ({dateTo}) => dayjs().isAfter(dayjs(dateTo));

function convertDuration(eventDiff) {
  const eventDuration = dayjs.duration(eventDiff);
  switch (true) {
    case eventDiff >= Milliseconds.IN_DAY:
      if (eventDuration.get('month') > MIN_MONTH_COUNT) {
        const durationInDays = eventDuration.format(DateFormat.IN_DAYS);
        const [days] = durationInDays.split(' ');
        return durationInDays.replace(days, (parseInt(days, 10) + eventDuration.get('month') * DAYS_IN_MONTH).toString().concat(CHAR_DAY));
      }
      return eventDuration.format(DateFormat.IN_DAYS);
    case eventDiff >= Milliseconds.IN_HOUR:
      return eventDuration.format(DateFormat.IN_HOURS);
    case eventDiff < Milliseconds.IN_HOUR:
      return eventDuration.format(DateFormat.IN_MINUTES);
    default:
      return '';
  }
}

const sortPointsByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sortPointsByTime = (pointA, pointB) => dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export {
  convertDate,
  getEventDiff,
  isFuturePoint,
  isPresentPoint,
  isPastPoint,
  sortPointsByDay,
  sortPointsByTime,
  sortPointsByPrice,
  convertDuration,
  isDatesEqual
};
