import { formateTime } from "./common";
import usePrayerTimes from "./hooks/usePrayerTimes";
import useCurrentPrayer from "./hooks/useCurrentPrayer";

function App() {
  const { prayerTimes, isLoading } = usePrayerTimes();
  const { currentPrayer } = useCurrentPrayer();
  const array = Object.entries(prayerTimes);

  return (
    <div className="bg-slate-800 min-h-screen text-white">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            <h2>Current Waqt</h2>
            {currentPrayer.name ? (
              <div>
                <p>{currentPrayer.name}</p>
                <p>{currentPrayer.remaining}</p>
              </div>
            ) : (
              "No prayer at the moment"
            )}
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
