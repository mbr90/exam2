import { Helmet } from "react-helmet-async";
import LoginForm from "../components/forms/LoginForm.jsx";

export default function Login() {
  return (
    <main className=" w-full h-screen bg-[url('/images/login.jpg')] pc:bg-none pc:grid pc:grid-cols-12 bg-center bg-cover pc:pt-0">
      <Helmet>
        <title>Holidaze: Login</title>
        <meta name="description" content="Login form" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>
      <div className="pc:col-span-5 pc:bg-cloud">
        <img
          src="/logo/Holidaze.svg"
          alt="Holidae Logo"
          className="w-auto mx-auto h-[74px] pc:hidden"
        />
        <div className=" flex flex-col mx-auto max-w-md w-full p-4 bg-cloud bg-opacity-75 rounded-3xl mt-20">
          <LoginForm />
          <p className="text-charcoal font-text font-semibold mx-auto max-w-[360px] mt-10">
            Log in to Admin dashboard to manage venues and enquiries
          </p>
        </div>
      </div>
      <div className="hidden pc:flex pc:col-span-7 w-full bg-charcoal ">
        <img
          src="/images/login.jpg"
          alt="Woman in sunhat dancing during sunset"
          className=" object-cover h-full w-full max-h-screen"
        />
      </div>
    </main>
  );
}
