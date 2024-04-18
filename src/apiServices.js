export async function callApi({ latitude, longitude }) {
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  const date = `${dd}-${mm}-${yyyy}`;

  const url = `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&iso8601=true&method=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
}
