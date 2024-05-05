import { Helmet } from "react-helmet-async";
import { useToken } from "../stores/useUserStore";

export default function AdminPage() {
  const token = useToken();
  return (
    <main>
      <Helmet>
        <title>Holidaze: Admin</title>
        <meta name="description" content="Admin panel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>
      {!token ? (
        <h1 className="text-3xl font-bold underline">
          You are not logged in, go to login:
        </h1>
      ) : (
        <h1 className="text-3xl font-bold underline">Hello Admin!</h1>
      )}
    </main>
  );
}
