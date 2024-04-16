export function formateTime(time) {
  const date = new Date(time);
  let hour = date.getHours();
  const minute = date.getMinutes();
  let ampm = "AM";
  if (hour > 12) {
    hour = hour - 12;
    ampm = "PM";
  }

  // Add 0 if hour or minute is less than 10
  const hourStr = hour < 10 ? `0${hour}` : hour;
  const minuteStr = minute < 10 ? `0${minute}` : minute;

  return `${hourStr}:${minuteStr} ${ampm}`;
}
