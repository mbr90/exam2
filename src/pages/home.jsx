import { Helmet } from "react-helmet-async";
import HeroSection from "../components/HeroSection";
import useFetchVenues from "../hooks/useFetchVenues";
import ShowVenues from "../components/ShowVenues";

export default function Home() {
  const { isPending, error, venues } = useFetchVenues();

  return (
    <>
      <Helmet>
        <title>Holidaze: Travel your dream</title>
        <meta
          name="description"
          content="Browse our collection of amazing venues for your next holiday"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>
      <HeroSection venues={venues} />
      <div className="max-w-[1636px] mx-auto my-8">
        <ShowVenues isPending={isPending} error={error} venues={venues} />
      </div>
    </>
  );
}
