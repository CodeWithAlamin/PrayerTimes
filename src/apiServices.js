export async function callApi({ latitude, longitude }) {
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  const date = `${dd}-${mm}-${yyyy}`;

  const url = `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&iso8601=true&method=1`;

  const response = await fetch(url).then((response) => response.json());

  return response;
}
