import { BASE_URL } from '@/config/index';

export default {
  booking: (bookingInfo) => fetch(`${BASE_URL}/api/receptions`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(bookingInfo),
  }).then((data) => data.json()),
};
