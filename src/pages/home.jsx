import { Helmet } from "react-helmet";
import HeroSection from "../components/HeroSection";

export default function Home() {
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
      <HeroSection />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}
