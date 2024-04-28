import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ErrorPageNotFound() {
  return (
    <div className="flex flex-col  w-full my-16">
      <Helmet>
        <title>Holidaze: 404 Page Not Found</title>
        <meta name="description" content="404: This page doesn't exist" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>
      <h1 className="mx-auto">404: Page not found</h1>
      <Link className="mx-auto" to="/">
        Home
      </Link>
    </div>
  );
}
