import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import BackgroundButton from "../common/buttons/BackgroundButton.jsx";
import { useMutation } from "@tanstack/react-query";
import postVenue from "../../api/post/postVenue";
import { useToken } from "../../stores/useUserStore";
import { capitalizeKeys } from "../../utils/capitalize";
import { useQueryClient } from "@tanstack/react-query";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";

const schema = yup
  .object({
    title: yup.string().required("Venue name is required"),
    location: yup.string().required("Location is required"),
    numberOfBeds: yup
      .number()
      .typeError("Number of beds must be a number")
      .required("Number of beds is required"),
    numberOfBedrooms: yup
      .number()
      .typeError("Number of bedrooms must be a number")
      .required("Number of bedrooms is required"),
    numberOfBathrooms: yup
      .number()
      .typeError("Number of bathrooms must be a number")
      .required("Number of bathrooms is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required"),
    description: yup
      .string()
      .required("Description is required")
      .max(240, "Description can not be more than 240 characters"),
    petFriendly: yup.boolean(),
    kitchen: yup.boolean(),
    tv: yup.boolean(),
    wirelessNetwork: yup.boolean(),
    dryer: yup.boolean(),
    washingMachine: yup.boolean(),
    freeParking: yup.boolean(),
    airConditioning: yup.boolean(),
    balcony: yup.boolean(),
    fireplace: yup.boolean(),
    media: yup.mixed().required("At least one image is required"),
  })
  .required();

export default function VenueForm() {
  const queryClient = useQueryClient();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      numberOfBeds: 0,
      numberOfBedrooms: 0,
      numberOfBathrooms: 0,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    register("numberOfBeds");
    register("numberOfBedrooms");
    register("numberOfBathrooms");
  }, [register]);

  const increment = (field) => {
    const currentValue = watch(field) || 0;
    setValue(field, currentValue + 1);
  };

  const decrement = (field) => {
    const currentValue = watch(field) || 0;
    if (currentValue > 0) {
      setValue(field, currentValue - 1);
    }
  };

  const token = useToken();

  const [files, setFiles] = useState([]);

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);

    setFiles(newFiles);

    setValue("media", newFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);
      setValue("media", newFiles);
    },
  });

  const postVenueMutation = useMutation({
    mutationFn: postVenue,
    onSuccess: (response) => {
      alert("Venue Created");
      console.log(response);
      reset();
      setFiles([]);
      queryClient.invalidateQueries(["venues"]);
    },
  });

  async function onSubmit(data) {
    const formData = new FormData();

    const { media, ...otherData } = data;

    formData.append("data", JSON.stringify(capitalizeKeys(otherData)));

    if (media && media.length) {
      media.forEach((file) => {
        formData.append("files.Media", file, file.name);
      });
    }

    postVenueMutation.mutate({
      data: formData,
      token: token,
    });
  }

  return (
    <form
      className="my-4  mx-auto col-span-4 tablet:col-span-8 pc:col-span-12 w-full  text-deepsea"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset
        className="flex flex-col  pc:flex-row gap-3 items-center justify-center"
        disabled={postVenueMutation.isLoading}
      >
        {postVenueMutation.isError && (
          <div className="text-red-500">{postVenueMutation.error.message}</div>
        )}

        <div className="flex flex-col gap-2 mx-auto w-80">
          <input
            className="w-full px-4 py-2 border placeholder:text-deepsea border-deepsea rounded-3xl focus:outline-none focus:border-deepsea max-w-[360px] bg-cloud shadow-md"
            placeholder="Venue Name"
            {...register("title")}
          />
          <p className="text-red-500 text-sm">{errors.title?.message}</p>

          <input
            className="w-full px-4 py-2 border placeholder:text-deepsea border-deepsea rounded-3xl focus:outline-none focus:border-deepsea max-w-[360px] bg-cloud shadow-md"
            placeholder="Location"
            {...register("location")}
          />
          <p className="text-red-500 text-sm">{errors.location?.message}</p>

          <div className="flex items-center gap-x-1 ">
            <p>Number of Beds</p>
            <div className="flex ml-auto mr-0">
              <button
                type="button"
                onClick={() => decrement("numberOfBeds")}
                className="p-1"
                aria-label="decrement number of beds"
              >
                <MdRemoveCircleOutline size={24} />
              </button>
              <span className="px-4 py-2">{watch("numberOfBeds") || 0}</span>
              <button
                type="button"
                onClick={() => increment("numberOfBeds")}
                className="p-1"
                aria-label="increment number of deds"
              >
                <MdAddCircleOutline size={24} />
              </button>
            </div>
          </div>

          <p className="text-red-500 text-sm">{errors.numberOfBeds?.message}</p>

          <div className="flex items-center gap-x-1 text-deepsea w-full ">
            <p>Number of Bedrooms</p>
            <div className="flex ml-auto mr-0">
              <button
                type="button"
                onClick={() => decrement("numberOfBedrooms")}
                className="p-1"
                aria-label="decrement Number of Bedrooms"
              >
                <MdRemoveCircleOutline size={24} />
              </button>
              <span className="px-4 py-2">
                {watch("numberOfBedrooms") || 0}
              </span>
              <button
                type="button"
                onClick={() => increment("numberOfBedrooms")}
                className="p-1"
                aria-label="increment Number of Bedrooms"
              >
                <MdAddCircleOutline size={24} />
              </button>
            </div>
          </div>
          <p className="text-red-500 text-sm">
            {errors.numberOfBedrooms?.message}
          </p>

          <div className="flex items-center gap-x-1 text-deepsea ">
            <p>Number of Bathrooms</p>
            <div className="flex ml-auto mr-0">
              <button
                type="button"
                onClick={() => decrement("numberOfBathrooms")}
                className="p-1"
                aria-label="decrement number of bathrooms"
              >
                <MdRemoveCircleOutline size={24} />
              </button>
              <span className="px-4 py-2">
                {watch("numberOfBathrooms") || 0}
              </span>
              <button
                type="button"
                onClick={() => increment("numberOfBathrooms")}
                className="p-1"
                aria-label="increment number of bathrooms"
              >
                <MdAddCircleOutline size={24} />
              </button>
            </div>
          </div>
          <p className="text-red-500 text-sm">
            {errors.numberOfBathrooms?.message}
          </p>

          <input
            className="w-full px-4 py-2 border bg-cloud placeholder:text-deepsea border-deepsea rounded-3xl focus:outline-none focus:border-deepsea max-w-[360px] shadow-md"
            placeholder="Price per night"
            type="number"
            {...register("price")}
          />
          <p className="text-red-500 text-sm">{errors.price?.message}</p>

          <textarea
            className="w-full px-4 py-2 border bg-cloud h-40 placeholder:text-deepsea border-deepsea rounded-3xl  focus:outline-none focus:border-deepsea max-w-[360px] shadow-md"
            placeholder="Description"
            {...register("description")}
            maxLength={240}
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        <div className="flex flex-col w-full px-2">
          <h1 className="font-header font-bold text-l mb-2 tablet:mx-auto ">
            Amenities:
          </h1>
          <div className="flex flex-col gap-2 mx-auto font-button">
            <label>
              <input type="checkbox" {...register("petFriendly")} /> Pets
              Allowed
            </label>
            <label>
              <input type="checkbox" {...register("kitchen")} /> Kitchen
            </label>
            <label>
              <input type="checkbox" {...register("tv")} /> TV
            </label>
            <label>
              <input type="checkbox" {...register("wirelessNetwork")} />{" "}
              Wireless Network
            </label>
            <label>
              <input type="checkbox" {...register("freeParking")} /> Free
              Parking
            </label>
            <label>
              <input type="checkbox" {...register("washingMachine")} /> Washing
              Machine
            </label>
            <label>
              <input type="checkbox" {...register("dryer")} /> Dryer
            </label>
            <label>
              <input type="checkbox" {...register("airConditioning")} /> Air
              Conditioning
            </label>
            <label>
              <input type="checkbox" {...register("balcony")} /> Balcony
            </label>
            <label>
              <input type="checkbox" {...register("fireplace")} /> Fireplace
            </label>
          </div>
        </div>
        <aside className=" flex  flex-col w-full max-w-[360px] px-2  gap-2">
          <ul>
            {files &&
              files.map((file, index) => (
                <li className="flex w-full font-button " key={file.path}>
                  {file.path} - {file.size} bytes
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="ml-2 text-tigerlily hover:underline"
                  >
                    <IoMdClose />
                  </button>
                </li>
              ))}
          </ul>
        </aside>
        <div
          {...getRootProps({
            className:
              "border-dashed w-full px-4 py-2 border bg-cloud h-40 placeholder:text-deepsea border-deepsea rounded-3xl  focus:outline-none focus:border-deepsea max-w-[360px] shadow-md",
          })}
        >
          <input {...getInputProps()} />
          <p className="w-20 mx-auto font-button">
            Drag and drop here, or{" "}
            <span className="text-tigerlily">browse</span>
          </p>
        </div>

        <p className="text-red-500 text-sm">{errors.media?.message}</p>

        <BackgroundButton
          text={postVenueMutation.isLoading ? "LISTING..." : "LIST VENUE"}
          type="submit"
          disabled={postVenueMutation.isLoading}
          className="w-full py-2"
        />
      </fieldset>
    </form>
  );
}
