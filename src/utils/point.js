import { MinCount, Days, DateFormat, Milliseconds } from './const.js';
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
  const eventDifference = dayjs(dateTo).diff(dayjs(dateFrom));
  const eventDuration = dayjs.duration(eventDifference);
  switch (true) {
    case eventDifference >= Milliseconds.IN_DAY:
      if (eventDuration.get('month') > MinCount.MOUTH && eventDuration.get('years') < MinCount.YEAR) {
        eventDuration.$d.days += (eventDuration.get('month') * Days.IN_MOUTH);
      }
      if (eventDuration.get('years') >= MinCount.YEAR) {
        eventDuration.$d.days += (eventDuration.get('month') * Days.IN_MOUTH) + (eventDuration.get('years') * Days.IN_YEAR);
      }
      return eventDuration.format(DateFormat.IN_DAYS);
    case eventDifference >= Milliseconds.IN_HOUR:
      return eventDuration.format(DateFormat.IN_HOURS);
    case eventDifference < Milliseconds.IN_HOUR:
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
