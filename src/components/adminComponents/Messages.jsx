import useAuthorizedFetch from "../../hooks/useAuthorizedFetch";
import { formatDate } from "../../utils/formatDate";

const endpoint = "/contacts?populate=*";

const queryKey = "Messages";

export default function Messages() {
  const { isPending, error, data } = useAuthorizedFetch(endpoint, queryKey);

  if (isPending) {
    return <div>Loading results..</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="flex flex-col w-full mx-auto max-w-[1636px]">
      <h1 className=" text-deepsea font-header font-bold px-8 mb-4">
        Latest Messages
      </h1>
      <div className=" w-full  grid grid-cols-4  gap-4 tablet:grid-cols-8 pc:grid-cols-12 grid-auto-row tablet:gap-6 pc:gap-8 px-4 tablet:px-4 pc:mx-auto pc:px-8 max-w-[1636px]">
        {data.data.map((message) => (
          <div
            className=" px-4 font-text col-span-4 tablet:col-span-4 pc:col-span-4 flex flex-col border-b border-tigerlily pb-5 w-72 max-w-96 "
            key={message.id}
          >
            <h2 className="font-header text-deepsea font-semibold">Date</h2>
            <p>{formatDate(message.attributes?.Date)}</p>
            <h2 className="font-header text-deepsea font-semibold">Name</h2>
            <p>{message.attributes?.Name}</p>
            <h2 className="font-header text-deepsea font-semibold">
              Email Address
            </h2>
            <p>{message.attributes?.Email}</p>

            <h1 className="font-header text-deepsea font-semibold">Subject</h1>
            <p>{message.attributes.Subject}</p>
            <h2 className="font-header text-deepsea font-semibold mt-4">
              Message
            </h2>
            <p>{message.attributes.Message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
