const apiUrl = import.meta.env.VITE_BASE_URL;

async function fetchVenues(endpoint) {
  const url = `${apiUrl}${endpoint}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `There was an error fetching the venues: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
}

export default fetchVenues;
