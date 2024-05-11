import ShowVenues from "../components/ShowVenues.jsx";
import { Helmet } from "react-helmet-async";
import SearchBar from "../components/common/search/SearchBar.jsx";
import useFetchVenues from "../hooks/useFetchVenues";

export default function Hotels() {
  const { isPending, error, venues } = useFetchVenues();
  return (
    <main>
      <Helmet>
        <title>Holidaze: Venues</title>
        <meta name="description" content="Our venues" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>
      <div className="flex w-full align-middle justify-center py-8">
        <span className="bg-slate-50 rounded-full">
          <SearchBar venues={venues} />
        </span>
      </div>
      <ShowVenues isPending={isPending} error={error} venues={venues} />
    </main>
  );
}
