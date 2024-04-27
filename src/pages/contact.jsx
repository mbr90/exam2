import { Helmet } from "react-helmet";

export default function Contact() {
  return (
    <main>
      <Helmet>
        <title>Holidaze: Contact</title>
        <meta name="description" content="Contact us" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>
      <h1 className="text-3xl font-bold underline">Hello contact!</h1>
    </main>
  );
}
