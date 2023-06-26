const serviceListToString = (services) => services.reduce(
  // eslint-disable-next-line no-underscore-dangle
  (acc, service) => `${acc}${acc ? '_' : ''}${service._id}`,
  '',
);

const groupServicesByCategories = (services) => {
  const categories = {};
  services.forEach((service) => {
    if (!categories[service.category]) {
      categories[service.category] = [];
    }
    categories[service.category].push(service);
  });
  return categories;
};

const getFreeTimeByExluded = (excludedTimes, date) => {
  const freeTime = [];
  for (
    let i = date === new Date().toISOString().substr(0, 10)
      ? new Date().getHours() + 1
      : 10;
    i < 23;
    i += 1
  ) {
    if (!excludedTimes.includes(`${i}:00`)) {
      freeTime.push(`${i}:00`);
    }
  }
  return freeTime;
};

export default {
  serviceListToString,
  groupServicesByCategories,
  getFreeTimeByExluded,
};
