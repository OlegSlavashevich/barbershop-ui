import { ALLOWED_TIMES, BASE_URL } from '@/config/index';
import Utils from '@/utils/index';

export default {
  fetchServices: async ({ date, time, masterId }) => {
    let url = `${BASE_URL}/api/service`;

    const queryString = new URLSearchParams({
      startTime: ALLOWED_TIMES.START_TIME,
      endTime: ALLOWED_TIMES.END_TIME,
      ...(masterId && { masterId }),
      ...(date && { date }),
      ...(time && { time }),
    }).toString();

    url = `${url}?${queryString}`;

    const services = await fetch(url)
      .then((data) => data.json())
      .then((data) => data.services);

    return Utils.groupServicesByCategories(services);
  },
};
