import useAuthorizedFetch from "../../hooks/useAuthorizedFetch";
import { formatDate } from "../../utils/formatDate";

const endpoint = "/enquirys?populate=*";

const queryKey = "Enquirys";

export default function Enquirys() {
  const { isPending, error, data } = useAuthorizedFetch(endpoint, queryKey);

  if (isPending) {
    return <div>Loading results..</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className=" w-full grid grid-cols-4 gap-4 tablet:grid-cols-8 pc:grid-cols-12 grid-auto-row tablet:gap-6 pc:gap-8 px-2 tablet:px-4 pc:mx-auto pc:px-8 max-w-[1636px]">
      <h1 className="col-span-2">Latest Enquirys</h1>
      {data.data.map((enquiry) => (
        <div
          className=" border-deepsea font-text p-2 col-span-4 tablet:col-span-8 pc:col-span-12 grid grid-cols-4 border pb-5 rounded-lg gap-2 mb-10"
          key={enquiry.id}
        >
          <section className="flex flex-col col-span-4 mr-10">
            <h2 className="font-header text-deepsea font-semibold">Date</h2>
            <p>{formatDate(enquiry.attributes?.Date)}</p>
            <h2 className="font-header text-deepsea font-semibold">Name</h2>
            <p>{enquiry.attributes?.Name}</p>
            <h2 className="font-header text-deepsea font-semibold">
              Email Address
            </h2>
            <p>{enquiry.attributes?.Email}</p>
          </section>{" "}
          <section className="flex flex-col col-span-4 mr-10 ">
            <h1 className="font-header text-deepsea font-semibold">Venue</h1>
            <p>{enquiry.attributes.venue.data.attributes.Title}</p>
            <p className="font-header text-deepsea font-semibold">
              Prefered Check-in Date
            </p>
            <p>{formatDate(enquiry.attributes.CheckIn)}</p>
            <p className="font-header text-deepsea font-semibold">
              Prefered Check-out Date
            </p>
            <p>{formatDate(enquiry.attributes.CheckOut)}</p>
          </section>
          <section className="flex flex-col col-span-4 mr-10">
            <h1 className="font-header text-deepsea font-semibold">Who</h1>
            <p>Adults:{enquiry.attributes.Adults}</p>
            <p>Children:{enquiry.attributes.Children}</p>
            <p>Pets:{enquiry.attributes.Pets}</p>
          </section>
        </div>
      ))}
    </div>
  );
}
