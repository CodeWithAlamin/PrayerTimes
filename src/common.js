export function getPosition() {
  let myPosition = null;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        myPosition = position;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return myPosition;
}
