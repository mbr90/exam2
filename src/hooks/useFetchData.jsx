import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_BASE_URL;

const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUrl = `${apiUrl}${endpoint}`;
    async function fetchData() {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(fetchUrl);
        const json = await response.json();
        setData(json.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [endpoint]);

  return { data, isLoading, isError };
};

export default useFetchData;
