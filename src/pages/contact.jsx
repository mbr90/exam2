import { Helmet } from "react-helmet-async";
import ContactForm from "../components/forms/ContactForm";

export default function Contact() {
  return (
    <main>
      <Helmet>
        <title>Holidaze: Contact</title>
        <meta name="description" content="Contact us" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>
      <ContactForm />
    </main>
  );
}
