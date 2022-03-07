export function formatToDateIso(someDate) {
  const dateDay = String(someDate.split('-')[0]);
  const dateMonth = String(someDate.split('-')[1]);
  const dateYear = String(someDate.split('-')[2].split(',')[0]);
  const dateHour = String(someDate.split(':')[0].split(' ')[1]);
  const dateMinute = String(someDate.split(':')[1].split(',')[0]);
  const timezoneOffset = '+01:00';
  // String such as 2019-01-11T12:37:00+01:00
  const dateISO = dateYear + '-' + dateMonth + '-' + dateDay + 'T' + dateHour + ':' + dateMinute + ':00' + timezoneOffset;
  return dateISO;
};