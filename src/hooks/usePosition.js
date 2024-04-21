import { useEffect, useState } from "react";
// import useGlobalState from "./useGlobalState";

function usePosition() {
  const [latLong, setLatLong] = useState();
  const [positionError, setPositionError] = useState(null);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLatLong({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //       },
  //       (positionError) => {
  //         if (positionError.code === 1) {
  //           setPositionError(
  //             "⚠️Please enable location permission to use this feature!"
  //           );
  //         } else {
  //           setPositionError("Unable to retrieve location!");
  //         }
  //       }
  //     );
  //   }
  // }, []);

  ///////////
  /////////

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.permissions
      .query({
        name: "geolocation",
      })
      .then(function (result) {
        const onLocationFetchSuccess = (position) => {
          console.log("postion", position);
          setLatLong({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        };

        const onLocationFetchFailure = (error = {}) => {
          // Error code 1 corresponds to user denying/blocking the location permission
          if (error.code === 1) {
            setPositionError(
              "⚠️Please enable location permission to use this feature!"
            );
          }
        };

        navigator.geolocation.getCurrentPosition(
          onLocationFetchSuccess,
          onLocationFetchFailure
        );

        if (result.state === "denied") onLocationFetchFailure();

        // This will still work for Chrome
        result.onchange = function () {
          if (result.state === "denied") {
            onLocationFetchFailure();
          }
        };
      });
  }, []);

  return { latLong, positionError };
}

export default usePosition;
