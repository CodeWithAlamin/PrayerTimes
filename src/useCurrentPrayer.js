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

      currentPrayer.remaining = `${hours} hours ${minutes} minutes`;

      setCurrentPrayer(currentPrayer);
    };

    updateCurrentPrayer(); // Call the function immediately

    // update the remaining time every ten seconds
    const interval = setInterval(updateCurrentPrayer, 5000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  return { currentPrayer };
}

export default useCurrentPrayer;
