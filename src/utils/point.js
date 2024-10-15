import { MIN_MONTH_COUNT, DAYS_IN_MONTH, Symbol, DateFormat, Milliseconds } from './const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(duration);
dayjs.extend(isBetween);

const convertDate = (date, format) => date ? dayjs(date).format(format) : '';
const isFuturePoint = ({dateFrom}) => dayjs().isBefore(dateFrom);
const isPresentPoint = ({dateFrom, dateTo}) => dayjs(new Date()).isBetween(dateFrom, dayjs(dateTo));
const isPastPoint = ({dateTo}) => dayjs().isAfter(dayjs(dateTo));

function convertDuration(dateFrom, dateTo) {
  const eventDiff = dayjs(dateTo).diff(dayjs(dateFrom));
  const eventDuration = dayjs.duration(eventDiff);
  switch (true) {
    case eventDiff >= Milliseconds.IN_DAY:
      if (eventDuration.get('month') > MIN_MONTH_COUNT) {
        const durationInDays = eventDuration.format(DateFormat.IN_DAYS);
        const [days] = durationInDays.split(' ');
        return durationInDays.replace(days, (parseInt(days, 10) + eventDuration.get('month') * DAYS_IN_MONTH).toString().concat(Symbol.DAY));
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
const getOffersChecked = (offers, type) => offers.find((offer) => type === offer.type)?.offers;
const getOffersTotal = (offerIDs = [], offers = []) => offerIDs.reduce((offerCost, id) => offerCost + (offers.find((offer) => offer.id === id)?.price ?? 0), 0);
const isMinorChange = (pointA, pointB) => pointA.dateFrom.getTime() !== pointB.dateFrom.getTime()
|| pointA.basePrice !== pointB.basePrice
|| convertDuration(pointA.dateFrom, pointA.dateTo) !== convertDuration(pointB.dateFrom, pointB.dateTo);

export {
  convertDate,
  isFuturePoint,
  isPresentPoint,
  isPastPoint,
  sortPointsByDay,
  sortPointsByTime,
  sortPointsByPrice,
  convertDuration,
  isMinorChange,
  getOffersChecked,
  getOffersTotal,
};
