import useCurrentPrayer from "./hooks/useCurrentPrayer";

function CurrentPrayer() {
  const { currentPrayer, isLoading, error } = useCurrentPrayer();

  if (isLoading || error) return null;

  return (
    <div className=" mx-auto bg-teal-600 max-w-md w-full rounded-2xl mb-8 p-4 flex flex-col items-center">
      <h2 className=" mb-4 border-b-2 border-dotted border-white pb-2">
        Current Waqt
      </h2>
      {currentPrayer.name ? (
        <>
          <p className="font-bold text-2xl">{currentPrayer.name}</p>
          <p>{currentPrayer.remaining}</p>
        </>
      ) : (
        "No prayer at the moment"
      )}
    </div>
  );
}

export default CurrentPrayer;
