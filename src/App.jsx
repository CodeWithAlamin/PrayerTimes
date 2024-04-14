import { useEffect } from "react";
import { callApi } from "./Services";
import { useState } from "react";

function App() {
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const [prayerTimes, setPrayerTimes] = useState({});

  useEffect(() => {
    async function fetchData() {
      const { data } = await callApi();
      const { timings } = data;

      // sample data from the API
      // Fajr : 04:15
      // Sunrise : 05:39
      // Dhuhr : 11:59
      // Asr : 15:26
      // Sunset : 18:19
      // Maghrib : 18:19
      // Isha : 19:49
      // Imsak : 04:05
      // Midnight : 23:59
      // Firstthird : 22:06
      // Lastthird : 01:52

      // Asr prayer's ending time is 15 minutes minus from the Maghrib prayer starting time. so we need to calculate it now.
      const [hour, minute] = timings["Maghrib"].split(":");
      const Maghrib = new Date();
      Maghrib.setHours(hour);
      Maghrib.setMinutes(minute);
      Maghrib.setMinutes(Maghrib.getMinutes() - 15);

      const asrEndHour = Maghrib.getHours();
      const asrEndMinute = Maghrib.getMinutes();
      const asrEnd = `${asrEndHour}:${asrEndMinute}`;

      const formatedTimings = {
        Fajr: { from: timings.Fajr, to: timings.Sunrise },
        Dhuhr: { from: timings.Dhuhr, to: timings.Asr },
        Asr: { from: timings.Asr, to: asrEnd },
        Maghrib: { from: timings.Maghrib, to: timings.Isha },
        Isha: { from: timings.Isha, to: timings.Midnight },
      };

      setPrayerTimes(formatedTimings);
    }

    fetchData();
  }, []);

  // // calculate current prayer
  const nextPrayer = prayers.find((prayer) => {
    if (!prayerTimes[prayer]) return;

    const [hour, minute] = prayerTimes[prayer].from.split(":");
    const prayerTime = new Date();
    prayerTime.setHours(hour);
    prayerTime.setMinutes(minute);

    const currentTime = new Date();

    return currentTime < prayerTime;
  });

  const index = prayers.indexOf(nextPrayer);
  const currentPrayerName = index === 0 ? prayers[4] : prayers[index - 1];

  const array = Object.entries(prayerTimes);
  console.log(array);

  return (
    <div>
      <div>
        <h2>Current Waqt</h2>
        <p>{currentPrayerName}</p>
        <p>{}</p>
      </div>
      <hr />
      <div>
        {array.map((prayer, i) => (
          <p className={i === 2 ? "current-prayer" : ""} key={prayer[0]}>
            {prayer[0]} : {prayer[1].from} - {prayer[1].to}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
