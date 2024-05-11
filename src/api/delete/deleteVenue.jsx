const baseUrl = import.meta.env.VITE_BASE_URL;

async function deleteVenue({ id, token }) {
  const url = `${baseUrl}/venues/${id}`;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message ?? "There was an error");
  }
  return json;
}

export default deleteVenue;
