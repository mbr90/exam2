import { useEffect, useState } from "react";

const url = "http://localhost:1337/api/venues?populate=Forsidebilde";

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
    return <div>Loading results..</div>
  }

  if (isError) {
    return <div>Error loading data</div>
  }

  
//   let tittel = posts.data[0].attributes.Tittel


  
  console.log(data)

  let imageUrls = []
  
  data.forEach(post => {
    imageUrls.push("http://localhost:1337"+post.attributes.Forsidebilde.data.attributes.url)
  });

  console.log(imageUrls)
    
//   let bildeUrl = posts.data[0].attributes.Forsidebilde.data.attributes.url

//   console.log(bildeUrl)

 

  return(
    <div>Check console log for results. <img
    className="h-96 w-96 object-contain mx-auto"
    src={imageUrls[0]}
    
  /> <h1></h1> </div>
  )



}


{/* <img src={data.data[0].attributes.Forsidebilde.data.attributes.formats.thumbnail.url} alt={data.data[0].attributes.Tittel}></img> */}