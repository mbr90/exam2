import { Helmet } from "react-helmet-async";
import ContactForm from "../components/forms/ContactForm.jsx";

export default function Contact() {
  return (
    <main className=" w-full min-h-screen bg-[url('/images/contact.jpg')] tablet:bg-none bg-center bg-cover pt-5 overflow-auto">
      <Helmet>
        <title>Holidaze: Contact</title>
        <meta name="description" content="Contact us" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>
      <img
        src="/logo/Holidaze.svg"
        alt="Holidaze Logo"
        className="w-auto h-[74px] mx-auto tablet:hidden"
      />
      <div className=" flex flex-col mx-auto max-w-md w-full p-4 bg-cloud bg-opacity-75 rounded-3xl mt-16">
        <h1 className="text-deepsea font-header font-bold text-3xl text-center my-5">
          Get in touch!
        </h1>
        <ContactForm />
      </div>
    </main>
  );
}
