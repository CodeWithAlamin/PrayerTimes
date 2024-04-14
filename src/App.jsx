import { useEffect } from "react";
import { callApi } from "./Services";
import { useState } from "react";

function App() {
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const [timings, setTimings] = useState({});

  useEffect(() => {
    async function fetchData() {
      const { data } = await callApi();
      const { timings } = data;

      setTimings(timings);
    }

    fetchData();
  }, []);

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

  // calculate current prayer
  const nextPrayer = prayers.find((prayer) => {
    if (!timings[prayer]) return;

    const [hour, minute] = timings[prayer].split(":");
    const prayerTime = new Date();
    prayerTime.setHours(hour);
    prayerTime.setMinutes(minute);

    const currentTime = new Date();

    // console.log(currentTime, prayerTime);

    return currentTime < prayerTime;
  });

  const index = prayers.indexOf(nextPrayer);
  const currentPrayer = index === 0 ? prayers[4] : prayers[index - 1];
  console.log(currentPrayer);

  const array = Object.entries(timings);

  return (
    <div>
      {array.map((time, i) => (
        <p className={i === 4 ? "current-prayer" : ""} key={time}>
          {time[0]} : {time[1]}
        </p>
      ))}{" "}
    </div>
  );
}

export default App;
