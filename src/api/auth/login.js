const url = import.meta.env.VITE_BASE_URL + "/auth/local";

async function login(userDetails) {
  const options = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(userDetails),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error.message ?? "There was an error");
  }

  return json;
}

export default login;
