export function getPosition() {
  let myPosition = null;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        myPosition = position;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return myPosition;
}

export function formateTime(time) {
  // sample time 2024-04-14T19:24:00+06:00
  // to nice format in 12 hours 07:24 PM

  const date = new Date(time);
  let hour = date.getHours();
  const minute = date.getMinutes();
  let ampm = "AM";
  if (hour > 12) {
    hour = hour - 12;
    ampm = "PM";
  }

  // pad 0 if hour or minute is less than 10
  const hourStr = hour < 10 ? `0${hour}` : hour;
  const minuteStr = minute < 10 ? `0${minute}` : minute;

  return `${hourStr}:${minuteStr} ${ampm}`;
}
