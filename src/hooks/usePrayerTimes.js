import { useEffect, useState } from "react";
import { callApi } from "../apiServices";
import usePosition from "./usePosition";

function usePrayerTimes() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { latLong, positionError } = usePosition();

  const [prayerTimes, setPrayerTimes] = useState({});
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    // For testing purpose
    // const latLong = { latitude: 23.822337, longitude: 90.3654296 };

    async function fetchData() {
      if (!latLong.latitude || !latLong.longitude) return;

      setIsLoading(true);

      try {
        const response = await callApi(latLong);

        if (response.error) {
          setError("Failed to fetch data");
          setIsLoading(false);
          return;
        }

        const { data } = response;
        const { timings } = data;
        const { meta } = data;

        // Asr prayer's ending time is 15 minutes minus from the Maghrib prayer starting time.
        const asrEnd = new Date(timings["Maghrib"]);
        asrEnd.setMinutes(asrEnd.getMinutes() - 15);
        const asrEndIso = asrEnd.toISOString();

        // sunrise should last for 20 minutes
        const sunrise = new Date(timings["Sunrise"]);
        sunrise.setMinutes(sunrise.getMinutes() + 20);
        const sunriseIso = sunrise.toISOString();

        const formatedTimings = {
          Fajr: { from: timings.Fajr, to: timings.Sunrise },
          Sunrise: { from: timings.Sunrise, to: sunriseIso },
          Dhuhr: { from: timings.Dhuhr, to: timings.Asr },
          Asr: { from: timings.Asr, to: asrEndIso },
          Maghrib: { from: timings.Maghrib, to: timings.Isha },
          Isha: { from: timings.Isha, to: timings.Midnight },
        };

        setPrayerTimes(formatedTimings);
        setMetaData(meta);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [latLong]);

  useEffect(() => {
    if (positionError) {
      setError(positionError);
      setIsLoading(false);
    }
  }, [positionError]);

  return { prayerTimes, metaData, isLoading, error };
}

export default usePrayerTimes;
