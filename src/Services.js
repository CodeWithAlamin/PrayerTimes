export async function callApi() {
  const url =
    "https://api.aladhan.com/v1/timingsByCity/13-04-2024?city=Dhaka&country=Bangladesh&method=8";

  const response = await fetch(url).then((response) => response.json());

  return response;
}
