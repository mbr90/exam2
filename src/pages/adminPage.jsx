import { Helmet } from "react-helmet-async";
import { useToken } from "../stores/useUserStore";
import { useState } from "react";
import Venues from "../components/adminComponents/Venues.jsx";
import Enquirys from "../components/adminComponents/Enquirys.jsx";
import Messages from "../components/adminComponents/Messages.jsx";

export default function AdminPage() {
  const token = useToken();
  const [activeTab, setActiveTab] = useState("messages");
  return (
    <main>
      <Helmet>
        <title>Holidaze: Admin</title>
        <meta name="description" content="Admin panel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/HolidazeLogo.png" />
      </Helmet>
      <div className="w-full bg-deepsea h-[200px]  flex justify-center align-middle">
        <h1 className="text-white my-auto">Admin Dashboard</h1>
      </div>
      {!token ? (
        <h1 className="text-3xl font-header font-bold underline">
          You are not logged in, go to login:
        </h1>
      ) : (
        <section className="flex flex-col w-full">
          <div className="flex justify-center my-4 font-header font-bold text-deepsea  border-solid border-black border  mx-auto rounded-full shadow-xl text-sm">
            <button
              className={`px-2 tablet:px-16 py-3 rounded-full   ${
                activeTab === "messages" ? "bg-deepsea/20" : "bg-white"
              }`}
              onClick={() => setActiveTab("messages")}
            >
              Messages
            </button>
            <span className="w-1 h-4 border-r border-black border-solid my-auto"></span>
            <button
              className={`px-2 tablet:px-16 py-3 rounded-full  ${
                activeTab === "enquiries" ? "bg-deepsea/20" : "bg-white"
              }`}
              onClick={() => setActiveTab("enquiries")}
            >
              Enquiries
            </button>
            <span className="w-1 h-4 border-l border-black border-solid my-auto"></span>
            <button
              className={`px-2 tablet:px-16 py-3 rounded-full  ${
                activeTab === "venues" ? "bg-deepsea/20" : "bg-white"
              }`}
              onClick={() => setActiveTab("venues")}
            >
              List a venue
            </button>
          </div>
          {activeTab === "messages" && <Messages />}
          {activeTab === "venues" && <Venues />}
          {activeTab === "enquiries" && <Enquirys />}
        </section>
      )}
    </main>
  );
}
