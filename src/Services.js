export async function callApi({ latitude, longitude }) {
  // "http://api.aladhan.com/v1/timings/14-4-2024?latitude=51.508515&longitude=-0.1254872&method=2";

  const today = new Date();
  const dd = today.getDate();
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1;

  const date = `${dd}-${mm}-${yyyy}`;

  const url = `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&iso8601=true&method=2`;

  const response = await fetch(url).then((response) => response.json());

  return response;
}
