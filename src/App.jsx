import { useEffect } from "react";
import { callApi } from "./Services";
import { useState } from "react";
import { formateTime } from "./common";
// import { getPosition } from "./common";

function App() {
  const [isLoading, setIsLoading] = useState(true); // Add this line

  const [prayerTimes, setPrayerTimes] = useState({});
  const [currentPrayer, setCurrentPrayer] = useState({
    name: "",
    remaining: "",
  });

  const [latLong, setLatLong] = useState({});
  // console.log(latLong);

  // get the position

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatLong({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!latLong.latitude || !latLong.longitude) return;

      setIsLoading(true);
      const { data } = await callApi(latLong);
      const { timings } = data;

      // Asr prayer's ending time is 15 minutes minus from the Maghrib prayer starting time. so we need to calculate it now.
      const asrEnd = new Date(timings["Maghrib"]);

      asrEnd.setMinutes(asrEnd.getMinutes() - 15);

      const formatedTimings = {
        Fajr: { from: timings.Fajr, to: timings.Sunrise },
        Dhuhr: { from: timings.Dhuhr, to: timings.Asr },
        Asr: { from: timings.Asr, to: asrEnd },
        Maghrib: { from: timings.Maghrib, to: timings.Isha },
        Isha: { from: timings.Isha, to: timings.Midnight },
      };

      setPrayerTimes(formatedTimings);
      setIsLoading(false);
    }

    fetchData();
  }, [latLong]);

  // calculate remaining time and update the state every minute
  useEffect(() => {
    const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    const updateRemainingTime = () => {
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

      // calculate remaining time
      if (!prayerTimes[currentPrayerName]) return;

      const [hour, minute] = prayerTimes[currentPrayerName].to.split(":");
      const prayerTime = new Date();
      prayerTime.setHours(hour);
      prayerTime.setMinutes(minute);

      const currentTime = new Date();
      const diff = prayerTime - currentTime;

      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);

      const remainingTime = `${hours} hours ${minutes} minutes`;

      const currentPrayer = {
        name: currentPrayerName,
        remaining: remainingTime,
      };

      setCurrentPrayer(currentPrayer);
    };

    updateRemainingTime(); // Call the function immediately

    // update the remaining time every ten seconds
    const interval = setInterval(updateRemainingTime, 10000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  const array = Object.entries(prayerTimes);

  //////////////
  ////////////////

  return (
    <div className="bg-slate-800 min-h-screen text-white">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            <h2>Current Waqt</h2>
            <p>{currentPrayer.name}</p>
            <p>{currentPrayer.remaining}</p>
          </div>
          <hr />
          <div>
            {array.map((prayer) => (
              <p
                className={
                  prayer[0] === currentPrayer.name
                    ? "border-l-4 border-l-yellow-300 pl-2 m-2 ml-0 text-2xl"
                    : ""
                }
                key={prayer[0]}
              >
                {prayer[0]} : {formateTime(prayer[1].from)} -{" "}
                {formateTime(prayer[1].to)}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
