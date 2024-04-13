import { useEffect } from "react";
import { callApi } from "./Services";
import { useState } from "react";

function App() {
  const [timings, setTimings] = useState({});

  useEffect(() => {
    async function fetchData() {
      const { data } = await callApi();
      const { timings } = data;

      setTimings(timings);
    }

    fetchData();
  }, []);

  const array = Object.entries(timings);

  return (
    <div>
      {array.map((time) => (
        <p key={time}>
          {time[0]} : {time[1]}
        </p>
      ))}{" "}
    </div>
  );
}

export default App;
