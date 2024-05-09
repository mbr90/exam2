import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import BackgroundButton from "../common/buttons/BackgroundButton";
import { useMutation } from "@tanstack/react-query";
import postVenue from "../../api/post/postVenue";
import { useToken } from "../../stores/useUserStore";
import { capitalizeKeys } from "../../utils/capitalize";

const schema = yup
  .object({
    title: yup.string().required("Venue name is required"),
    location: yup.string().required("Location is required"),
    numberOfBeds: yup.number().required("Number of beds is required"),
    numberOfBedrooms: yup.number().required("Number of bedrooms is required"),
    numberOfBathrooms: yup.number().required("Number of bathrooms is required"),
    price: yup.number().required("Price is required"),
    description: yup.string().required("Description is required"),
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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const token = useToken();

  const files = watch("media");

  //TODO: Specify accepted images and create error handling image/jpeg, image/png, image/gif

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      setValue(
        "media",
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const postVenueMutation = useMutation({
    mutationFn: postVenue,
    onSuccess: (response) => {
      alert("Venue Created");
      console.log(response);
      reset();
    },
  });

  async function onSubmit(data) {
    console.log(data);
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
      className="my-4  mx-auto col-span-4 tablet:col-span-8 pc:col-span-12 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset
        className="flex flex-col tablet:flex-row pc:flex-row gap-3 items-center justify-center"
        disabled={postVenueMutation.isLoading}
      >
        {postVenueMutation.isError && (
          <div className="text-red-500">{postVenueMutation.error.message}</div>
        )}

        <div className="flex flex-col">
          <input placeholder="Venue Name" {...register("title")} />
          <p className="text-red-500 text-sm">{errors.title?.message}</p>

          <input placeholder="Location" {...register("location")} />
          <p className="text-red-500 text-sm">{errors.location?.message}</p>

          <input
            placeholder="Number of Beds"
            type="number"
            {...register("numberOfBeds")}
          />
          <p className="text-red-500 text-sm">{errors.numberOfBeds?.message}</p>

          <input
            placeholder="Number of Bedrooms"
            type="number"
            {...register("numberOfBedrooms")}
          />
          <p className="text-red-500 text-sm">
            {errors.numberOfBedrooms?.message}
          </p>

          <input
            placeholder="Number of Bathrooms"
            type="number"
            {...register("numberOfBathrooms")}
          />
          <p className="text-red-500 text-sm">
            {errors.numberOfBathrooms?.message}
          </p>

          <input placeholder="Price" type="number" {...register("price")} />
          <p className="text-red-500 text-sm">{errors.price?.message}</p>

          <textarea placeholder="Description" {...register("description")} />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h1>Amenities:</h1>
          <label>
            <input type="checkbox" {...register("petFriendly")} /> Pets Allowed
          </label>
          <label>
            <input type="checkbox" {...register("kitchen")} /> Kitchen
          </label>
          <label>
            <input type="checkbox" {...register("tv")} /> TV
          </label>
          <label>
            <input type="checkbox" {...register("wirelessNetwork")} /> Wireless
            Network
          </label>
          <label>
            <input type="checkbox" {...register("freeParking")} /> Free Parking
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

        <div
          {...getRootProps({
            className: " border-dashed border-4 border-gray-300",
          })}
        >
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>
            {files &&
              files.map((file) => (
                <li key={file.path}>
                  {file.path} - {file.size} bytes
                </li>
              ))}
          </ul>
        </aside>
        <p className="text-red-500 text-sm">{errors.media?.message}</p>

        <BackgroundButton
          text={postVenueMutation.isLoading ? "Posting..." : "Post Venue"}
          type="submit"
          disabled={postVenueMutation.isLoading}
          className="w-full py-2"
        />
      </fieldset>
    </form>
  );
}
