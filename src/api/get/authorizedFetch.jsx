const apiUrl = import.meta.env.VITE_BASE_URL;

async function authorizedFetch(endpoint, token) {
  const url = `${apiUrl}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `There was an error fetching the venues: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
}

export default authorizedFetch;
