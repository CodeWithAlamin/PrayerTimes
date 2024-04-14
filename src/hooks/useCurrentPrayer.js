import { useEffect, useState } from "react";
import usePrayerTimes from "./usePrayerTimes";

function useCurrentPrayer() {
  const { prayerTimes } = usePrayerTimes();

  const [currentPrayer, setCurrentPrayer] = useState({
    name: "",
    remaining: "",
  });

  // calculate remaining time and update the state every minute
  useEffect(() => {
    const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    const updateCurrentPrayer = () => {
      if (!prayerTimes[prayers[0]]) return;
      // calculate current prayer
      const now = new Date();
      let currentPrayer = { name: "", remaining: "" };

      // find the current prayer, use forEach
      prayers.forEach((prayer) => {
        // if (!prayerTimes[prayer]) return;

        const from = new Date(prayerTimes[prayer].from);
        const to = new Date(prayerTimes[prayer].to);

        if (now >= from && now <= to) {
          currentPrayer.name = prayer;
        }
      });

      ///////////////////////////
      // calculate remaining time
      if (!currentPrayer.name) return;

      const to = new Date(prayerTimes[currentPrayer.name].to);
      const diff = to - now;
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

      // if hour is 0, show only minutes and if minutes is 0, show only hours
      // if hour is just 1 then write hour not hours
      const hourText = hours ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
      const minuteText = minutes
        ? `${minutes} minute${minutes > 1 ? "s" : ""}`
        : "";

      currentPrayer.remaining = `${hourText} ${minuteText} left`;

      setCurrentPrayer(currentPrayer);
    };

    updateCurrentPrayer(); // Call the function immediately

    // update the remaining time
    const interval = setInterval(updateCurrentPrayer, 5000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  return { currentPrayer };
}

export default useCurrentPrayer;
