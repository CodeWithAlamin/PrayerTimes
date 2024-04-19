import { useEffect, useState } from "react";

function usePosition() {
  const [latLong, setLatLong] = useState({});
  const [positionError, setPositionError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatLong({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (positionError) => {
          if (positionError.code === 1) {
            setPositionError(
              "⚠️Please enable location permission to use this feature!"
            );
          } else {
            setPositionError("Unable to retrieve location!");
          }
        }
      );
    }
  }, []);

  return { latLong, positionError };
}

export default usePosition;
