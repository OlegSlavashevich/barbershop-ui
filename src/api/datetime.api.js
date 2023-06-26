import { ALLOWED_TIMES, BASE_URL } from '@/config/index';
import Utils from '../utils/index';

export default {
  fetchAllowedDates: async ({ masterId, services }) => {
    let url = `${BASE_URL}/api/receptions/dates`;

    const queryString = new URLSearchParams({
      startTime: ALLOWED_TIMES.START_TIME,
      endTime: ALLOWED_TIMES.END_TIME,
      type: 'included',
      ...(masterId && { masterId }),
      ...(services.length && {
        services: Utils.serviceListToString(services),
      }),
    }).toString();

    url = `${url}?${queryString}`;

    const excludedDates = await fetch(url)
      .then((data) => data.json())
      .then((data) => data.data.dates);
    return excludedDates;
  },
  fetchExcludedTimes: async ({ masterId, services, date }) => {
    let url = `${BASE_URL}/api/receptions/excludedTimes`;

    const queryString = new URLSearchParams({
      startTime: ALLOWED_TIMES.START_TIME,
      endTime: ALLOWED_TIMES.END_TIME,
      date,
      ...(masterId && { masterId }),
      ...(services.length && {
        services: Utils.serviceListToString(services),
      }),
    }).toString();

    url = `${url}?${queryString}`;

    const excludedTimes = await fetch(url)
      .then((data) => data.json())
      .then((data) => data.excludedTimes);
    const freeTimes = Utils.getFreeTimeByExluded(excludedTimes, date);
    return freeTimes;
  },
};
