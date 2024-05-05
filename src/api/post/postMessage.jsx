const url = import.meta.env.VITE_BASE_URL + "/contacts";

async function postMessage(messageDetails) {
  const detailsWithTimestamp = {
    ...messageDetails,
    Date: new Date().toISOString(),
  };

  const payload = {
    data: detailsWithTimestamp,
  };

  const options = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(payload),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error.message ?? "There was an error");
  }

  return json;
}

export default postMessage;
