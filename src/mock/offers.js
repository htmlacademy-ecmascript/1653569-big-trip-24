const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'taxi-01',
        title: 'Order Uber',
        price: 20
      },
      {
        id: 'taxi-02',
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 'flight-01',
        title: 'Add luggage',
        price: 50
      },
      {
        id: 'flight-02',
        title: 'Switch to comfort',
        price: 80
      },
      {
        id: 'flight-03',
        title: 'Add meal',
        price: 15
      },
      {
        id: 'flight-04',
        title: 'Choose seats',
        price: 5
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'check-in-01',
        title: 'Add breakfast',
        price: 50
      },
      {
        id: 'check-in-02',
        title: 'Cleaning room',
        price: 150
      }
    ]
  },
  {
    type: 'drive',
    offers: []
  }
];

export { mockOffers };
