const getISODatesForFromAndTo = (date) => {
  const day = 60 * 60 * 24 * 1000;
  const startDate = new Date(date + " " + "00:00");
  const endDate = new Date(startDate.getTime() + day);
  const from = startDate.toISOString();
  const to = endDate.toISOString();
  return { from, to };
}

module.exports = {getISODatesForFromAndTo};