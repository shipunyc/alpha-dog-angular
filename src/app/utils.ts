export const formatRate = (value) => {
  return +(value / 1e4).toFixed(4);
}

export const formatBalance = (value, decimals=0) => {
  const result = +((+value) / 1e18).toFixed(decimals);
  return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatDate = (date, separator='-') => {
  var d = new Date(date),
    month = '' + (d.getUTCMonth() + 1),
    day = '' + d.getUTCDate(),
    year = d.getUTCFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  return [year, month, day].join(separator);
}

export const formatDateSimple = (date) => {
  var d = new Date(date),
    month = '' + (d.getUTCMonth() + 1),
    day = '' + d.getUTCDate();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [month, day].join('-');
}

export const formatFixed = (x, p) => {
  return Math.max(0, +(x - 0.1 ** (p + 1) * 4.99).toFixed(p));
}
