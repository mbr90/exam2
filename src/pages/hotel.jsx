import { Helmet } from "react-helmet";

export default function Hotel() {
  return (
    <main>
      <Helmet>
        <title>Holidaze: Venues</title>
        <meta name="description" content="Our venues" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>
      <h1 className="text-3xl font-bold underline">Hello hotel!</h1>
    </main>
  );
}
