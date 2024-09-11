import { getRandomArrayElement } from '../utils';

const mockPoints = [
  {
    id: 1,
    basePrice: 100,
    dateFrom: '2019-10-02T18:10:00.845Z',
    dateTo: '2019-10-02T18:45:01.375Z',
    destination: 'destination-01',
    isFavorite: false,
    offers: [
      'taxi-01'
    ],
    type: 'taxi'
  },
  {
    id: 2,
    basePrice: 1500,
    dateFrom: '2019-10-02T20:15:56.845Z',
    dateTo: '2019-10-02T23:35:13.375Z',
    destination: 'destination-02',
    isFavorite: true,
    offers: [
      'flight-01',
      'flight-02'
    ],
    type: 'flight'
  },
  {
    id: 3,
    basePrice: 3500,
    dateFrom: '2019-10-03T06:10:56.845Z',
    dateTo: '2019-10-03T06:30:13.375Z',
    destination: 'destination-03',
    isFavorite: false,
    offers: [
      'check-in-01'
    ],
    type: 'check-in'
  },
  {
    id: 4,
    basePrice: 500,
    dateFrom: '2019-10-04T10:00:56.845Z',
    dateTo: '2019-10-10T12:30:13.375Z',
    destination: 'destination-04',
    isFavorite: true,
    offers: [],
    type: 'drive'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };
