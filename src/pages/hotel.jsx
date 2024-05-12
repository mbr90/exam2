import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import fetchVenues from "../api/get/fetchVenues";
import { useQuery } from "@tanstack/react-query";
import SingleVenueCard from "../components/cards/SingleVenueCard.jsx";
import { useNavigate } from "react-router-dom";

export default function Hotel() {
  const params = useParams();
  const endpoint = `/venues/${params.id}?populate=*`;
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const {
    isPending,
    error,
    data: venue,
  } = useQuery({
    queryKey: ["venue", `${params.id}`],
    queryFn: () => fetchVenues(endpoint),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <main className="w-full">
      <Helmet>
        <title>Venue {params.id}</title>
        <meta name="description" content="Our venues" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>
      <div className="tablet:mx-auto flex-col">
        <img
          src="/logo/Holidaze.svg"
          alt="Holidae Logo"
          className="w-auto h-[74px] mx-auto my-5 pc:hidden"
        />
        <button
          className="flex items-center tablet:hidden text-deepsea font-bold py-2 px-4 underline "
          onClick={goBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 12H5m7-7l-7 7 7 7"
            />
          </svg>
          BACK
        </button>
        {isPending ? (
          <div className="col-span-full text-center">Loading results...</div>
        ) : error ? (
          <div className="col-span-full text-center">{error.message}</div>
        ) : (
          <SingleVenueCard data={venue?.data} />
        )}
      </div>
    </main>
  );
}
