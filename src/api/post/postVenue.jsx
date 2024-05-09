const baseUrl = import.meta.env.VITE_BASE_URL;

async function postVenue({ data, token }) {
  const url = `${baseUrl}/venues`;

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message ?? "There was an error");
    }
    return json;
  } catch (error) {
    console.error("Failed to submit venue:", error);
    throw error;
  }
}

export default postVenue;
