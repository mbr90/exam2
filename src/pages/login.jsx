import { Helmet } from "react-helmet-async";
import LoginForm from "../components/forms/LoginForm.jsx";

export default function Login() {
  return (
    <main className=" w-full h-screen bg-[url('/images/login.jpg')] tablet:bg-none bg-center bg-cover pt-10">
      <Helmet>
        <title>Holidaze: Login</title>
        <meta name="description" content="Login form" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>
      <div className=" flex flex-col mx-auto max-w-md w-full p-4 bg-cloud bg-opacity-75 rounded-3xl mt-20">
        <img
          src="/logo/Holidaze.svg"
          alt="Holidae Logo"
          className="w-auto h-[74px]"
        />
        <LoginForm />
        <p className="text-charcoal mx-auto max-w-[360px] mt-10">
          Log in to Admin dashboard to manage venues and enquiries
        </p>
      </div>
    </main>
  );
}
