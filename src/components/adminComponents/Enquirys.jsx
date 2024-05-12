import useAuthorizedFetch from "../../hooks/useAuthorizedFetch";
import { formatDate } from "../../utils/formatDate";
import BackgroundButton from "../common/buttons/BackgroundButton";

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

  console.log(data);

  return (
    <section className="pb-4">
      <h1 className=" text-deepsea tablet:mx-auto font-header text-xl font-semibold px-8 mb-4 w-60">
        Latest Enquirys
      </h1>
      <div className=" w-full grid grid-cols-4 gap-4 tablet:grid-cols-8 pc:grid-cols-12 grid-auto-row tablet:gap-6 pc:gap-8 px-2 tablet:px-4 pc:mx-auto pc:px-8 max-w-[1636px]">
        {data?.data?.map((enquiry) => (
          <div
            className=" col-span-4 tablet:col-span-8 pc:col-span-4 flex flex-col gap-1 shadow-md w-full rounded-3xl max-w-96 mx-auto "
            key={enquiry.id}
          >
            <img
              className="col-span-4 h-[271px] object-cover rounded-t-3xl"
              src="/images/hotel6.jpg"
              alt={enquiry?.attributes.Title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/hotel6.jpg";
              }}
            />
            <section className="flex flex-col col-span-4 mr-10 p-4">
              <h2 className="font-header text-deepsea font-semibold">Date</h2>
              <p>{formatDate(enquiry?.attributes?.Date)}</p>
              <h2 className="font-header text-deepsea font-semibold">Name</h2>
              <p>{enquiry?.attributes?.Name}</p>
              <h2 className="font-header text-deepsea font-semibold">
                Email Address
              </h2>
              <p>{enquiry?.attributes?.Email}</p>
            </section>{" "}
            <section className="flex flex-col col-span-4 mr-10 p-4">
              <h1 className="font-header text-deepsea font-semibold">Venue</h1>
              <p>{enquiry?.attributes?.venue?.data?.attributes?.Title}</p>
              <p className="font-header text-deepsea font-semibold">
                Prefered Check-in Date
              </p>
              <p>{formatDate(enquiry?.attributes?.CheckIn)}</p>
              <p className="font-header text-deepsea font-semibold">
                Prefered Check-out Date
              </p>
              <p>{formatDate(enquiry?.attributes?.CheckOut)}</p>
            </section>
            <section className="flex flex-col col-span-4 mr-10 p-4">
              <h1 className="font-header text-deepsea font-semibold">Who</h1>
              <p>{enquiry?.attributes?.Adults} Adults</p>
              <p>{enquiry?.attributes?.Children} Children</p>
              {enquiry?.attributes?.Pets > 0 ?? (
                <p>{enquiry?.attributes?.Pets} Pets</p>
              )}
            </section>
            <div className="p-4 w-full">
              <div className="w-full max-w-60 mx-auto">
                <BackgroundButton text="CONFIRM ENQUIRY" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
