import useAuthorizedFetch from "../../hooks/useAuthorizedFetch";

const endpoint = "/enquirys?populate=*";

const queryKey = "Enquirys";

export default function Enquirys() {
  const { isPending, error, data } = useAuthorizedFetch(endpoint, queryKey);
  console.log(data);

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
          className=" border-black col-span-4 tablet:col-span-8 pc:col-span-12 flex border pb-5 rounded-lg "
          key={enquiry.id}
        >
          <section className="flex flex-col mr-10 w-1/5">
            <h2>Date</h2>
            <p>{enquiry.attributes?.Date}</p>
            <h2>Name</h2>
            <p>{enquiry.attributes?.Name}</p>
            <h2>Email Address</h2>
            <p>{enquiry.attributes?.Email}</p>
          </section>{" "}
          <section className="flex flex-col">
            <h1>Venue</h1>
            <p>{enquiry.attributes.venue.data.attributes.Title}</p>
            <p>Prefered Check-in Date</p>
            <p>{enquiry.attributes.CheckIn}</p>
            <p>Prefered Check-out Date</p>
            <p>{enquiry.attributes.CheckOut}</p>
          </section>
          <section className="flex flex-col">
            <h1>Who</h1>
            <p>Adults:{enquiry.attributes.Adults}</p>
            <p>Children:{enquiry.attributes.Children}</p>
            <p>Pets:{enquiry.attributes.Pets}</p>
          </section>
        </div>
      ))}
    </div>
  );
}
