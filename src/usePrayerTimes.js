import { useEffect, useState } from "react";
import { callApi } from "./Services";
import usePosition from "./usePosition";

function usePrayerTimes() {
  const [isLoading, setIsLoading] = useState(true);
  const latLong = usePosition();

  const [prayerTimes, setPrayerTimes] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (!latLong.latitude || !latLong.longitude) return;

      setIsLoading(true);
      const { data } = await callApi(latLong);
      const { timings } = data;

      // Asr prayer's ending time is 15 minutes minus from the Maghrib prayer starting time. so we need to calculate it now.
      const asrEnd = new Date(timings["Maghrib"]);

      asrEnd.setMinutes(asrEnd.getMinutes() - 15);

      const asrEndIso = asrEnd.toISOString();

      const formatedTimings = {
        Fajr: { from: timings.Fajr, to: timings.Sunrise },
        Dhuhr: { from: timings.Dhuhr, to: timings.Asr },
        Asr: { from: timings.Asr, to: asrEndIso },
        Maghrib: { from: timings.Maghrib, to: timings.Isha },
        Isha: { from: timings.Isha, to: timings.Midnight },
      };

      setPrayerTimes(formatedTimings);
      setIsLoading(false);
    }

    fetchData();
  }, [latLong]);

  return { prayerTimes, isLoading };
}

export default usePrayerTimes;
