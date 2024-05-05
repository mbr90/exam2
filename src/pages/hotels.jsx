import ShowVenues from "../components/ShowVenues";
import { Helmet } from "react-helmet-async";
import SearchBar from "../components/SearchBar";
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
      <SearchBar />
      <ShowVenues isPending={isPending} error={error} venues={venues} />
    </main>
  );
}
