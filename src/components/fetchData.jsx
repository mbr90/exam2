import { useEffect, useState } from "react";

const url = "http://localhost:1337/api/venues?populate=MainImage";

export default function FetchData() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);

        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setData(json.data);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }

    getData();
  }, []);

  if (isLoading) {
    return <div>Loading results..</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <img
            className="w-48 h-48"
            src={
              "http://localhost:1337" +
              item.attributes.MainImage.data.attributes.url
            }
          />

          <h1 className="text-xl">{item.attributes.Title}</h1>
          <p>{item.attributes.Description}</p>
        </div>
      ))}
      <h1></h1>{" "}
    </div>
  );
}
