export const convertDateToString = (date: Date) => {
  let month = (date.getMonth() + 1).toString(),
    day = (date.getDate()).toString(),
    year = date.getFullYear().toString();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2)
    day = `0${day}`;

  return [year, month, day].join('-');
}