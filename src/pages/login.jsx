import { Helmet } from "react-helmet-async";
import LoginForm from "../components/forms/LoginForm";

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Holidaze: Login</title>
        <meta name="description" content="Login form" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>
      <LoginForm />
    </>
  );
}
