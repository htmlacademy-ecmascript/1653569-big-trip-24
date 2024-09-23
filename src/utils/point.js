import { DateFormat } from '../const';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(isBetween);

const convertDate = (date, format) => date ? dayjs(date).utc().format(format) : '';
const getEventDuration = (eventStart, eventEnd) => (dayjs.duration(dayjs(eventEnd).set('seconds', 0).set('millisecond', 0).diff(dayjs(eventStart).set('seconds', 0).set('millisecond', 0)))).format(DateFormat.POINT);
const isFuturePoint = ({dateFrom}) => dayjs().isBefore(dateFrom);
const isPresentPoint = ({dateFrom, dateTo}) => dayjs(new Date()).isBetween(dateFrom, dayjs(dateTo));
const isPastPoint = ({dateTo}) => dayjs().isAfter(dayjs(dateTo));

const sortPointsByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sortPointsByTime = (pointA, pointB) => dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export {
  convertDate,
  getEventDuration,
  isFuturePoint,
  isPresentPoint,
  isPastPoint,
  sortPointsByDay,
  sortPointsByTime,
  sortPointsByPrice
};
