import useAuthorizedFetch from "../../hooks/useAuthorizedFetch";

const endpoint = "/contacts?populate=*";

const queryKey = "Messages";

export default function Messages() {
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
      <h1 className="col-span-2">Latest Messages</h1>
      {data.data.map((message) => (
        <div
          className=" border-black col-span-4 tablet:col-span-8 pc:col-span-12 flex border-b pb-5 "
          key={message.id}
        >
          <section className="flex flex-col mr-10 w-1/5">
            <h2>Date</h2>
            <p>{message.attributes?.Date}</p>
            <h2>Name</h2>
            <p>{message.attributes?.Name}</p>
            <h2>Email Address</h2>
            <p>{message.attributes?.Email}</p>
          </section>{" "}
          <section className="flex flex-col">
            <h1>Subject</h1>
            <p>{message.attributes.Subject}</p>
            <p>Message</p>
            <p>{message.attributes.Message}</p>
          </section>
        </div>
      ))}
    </div>
  );
}
