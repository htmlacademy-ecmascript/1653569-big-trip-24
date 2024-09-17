import { getRandomArrayElement } from '../utils/common.js';

const mockPoints = [
  {
    id: 1,
    basePrice: 100,
    dateFrom: '2024-09-14T18:10:00.845Z',
    dateTo: '2024-09-16T01:31:01.375Z',
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
    dateFrom: '2024-08-02T20:15:56.845Z',
    dateTo: '2024-08-02T23:35:13.375Z',
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
    dateFrom: '2024-10-03T06:10:56.845Z',
    dateTo: '2024-10-03T06:30:13.375Z',
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
    dateFrom: '2024-11-04T10:00:56.845Z',
    dateTo: '2024-11-10T12:30:13.375Z',
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
