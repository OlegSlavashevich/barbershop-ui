import { ALLOWED_TIMES, BASE_URL, NEAREST_TIME_NUMBER } from '@/config/index';
import Utils from '../utils/index';

export default {
  fetchMasters: async ({ services, date, time }) => {
    let url = `${BASE_URL}/api/master`;

    const queryString = new URLSearchParams({
      startTime: ALLOWED_TIMES.START_TIME,
      endTime: ALLOWED_TIMES.END_TIME,
      ...(services.length && {
        services: Utils.serviceListToString(services),
      }),
      ...(date && { date }),
      ...(time && { time }),
    }).toString();

    url = `${url}?${queryString}`;

    const masters = await fetch(url)
      .then((data) => data.json())
      .then((data) => data.masters);
    return masters;
  },
  fetchMasterNearestReceptions: async ({ masterId, services }) => {
    // eslint-disable-next-line no-underscore-dangle
    let url = `${BASE_URL}/api/master/receptions`;

    const queryString = new URLSearchParams({
      startTime: ALLOWED_TIMES.START_TIME,
      endTime: ALLOWED_TIMES.END_TIME,
      num: NEAREST_TIME_NUMBER,
      masterId,
      ...(services.length && {
        services: Utils.serviceListToString(services),
      }),
    }).toString();

    url = `${url}?${queryString}`;

    const result = await fetch(url).then((data) => data.json());
    return result;
  },
};
