// import { Helmet } from "react-helmet-async";
// import ContactForm from "../components/forms/ContactForm";

// export default function Contact() {
//   return (
//     <main className="relative w-full h-screen bg-[url('/images/contact.jpg')] tablet:bg-none bg-center bg-cover pt-4">
//       {" "}
//       <Helmet>
//         <title>Holidaze: Contact</title>
//         <meta name="description" content="Contact us" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/logo/HolidazeLogo.png" />
//       </Helmet>
//       <img
//         src="/logo/Holidaze.svg"
//         alt="Holidae Logo"
//         className="w-auto h-[74px] mx-auto tablet:hidden"
//       />
//       <div className="fixed flex flex-col inset-[0%] bottom-[10%] top-[13%] rounded-3xl bg-cloud bg-opacity-75 p-4 ">
//         <h1 className="text-deepsea mx-auto text-3xl ">Get in touch!</h1>
//         <ContactForm />
//       </div>
//     </main>
//   );
// }

import { Helmet } from "react-helmet-async";
import ContactForm from "../components/forms/ContactForm";

export default function Contact() {
  return (
    <main className=" w-full min-h-screen bg-[url('/images/contact.jpg')] tablet:bg-none bg-center bg-cover pt-10 overflow-auto">
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
      <div className=" flex flex-col mx-auto max-w-md w-full p-4 bg-cloud bg-opacity-75 rounded-3xl mt-10">
        <h1 className="text-deepsea text-3xl text-center">Get in touch!</h1>
        <ContactForm />
      </div>
    </main>
  );
}
