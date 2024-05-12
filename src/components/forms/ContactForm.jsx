import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BackgroundButton from "../common/buttons/BackgroundButton.jsx";
import { useMutation } from "@tanstack/react-query";
import postMessage from "../../api/post/postMessage";
import { capitalizeKeys } from "../../utils/capitalize";

const schema = yup
  .object({
    name: yup.string().required("Please enter your name"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    subject: yup.string().required("Please enter a subject"),
    message: yup.string().required("Please enter your message"),
  })
  .required();

export default function ContactForm() {
  const contactMutation = useMutation({
    mutationFn: postMessage,
    onSuccess: () => {
      alert("Your message has been sent!");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    const formattedData = capitalizeKeys(data);
    contactMutation.mutate(formattedData);
    reset();
  }

  return (
    <form
      className="mt-4 w-[95%] tablet:w-96 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset
        className="flex flex-col gap-3 items-center justify-center font-button text-xl"
        disabled={contactMutation.isLoading}
      >
        {contactMutation.isError && (
          <div className="text-red-500">{contactMutation.error.message}</div>
        )}

        <input
          placeholder="Name"
          className="w-full px-4 py-3 border-2 placeholder:text-deepsea border-deepsea rounded-3xl  focus:outline-none focus:border-deepsea max-w-[360px]"
          {...register("name")}
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>

        <input
          placeholder="Email"
          className="w-full px-4 py-3 border-2 placeholder:text-deepsea border-deepsea rounded-3xl  focus:outline-none focus:border-deepsea max-w-[360px]"
          {...register("email")}
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input
          placeholder="Subject"
          className="w-full px-4 py-3 border-2 placeholder:text-deepsea border-deepsea rounded-3xl  focus:outline-none focus:border-deepsea max-w-[360px]"
          {...register("subject")}
        />
        <p className="text-red-500 text-sm">{errors.subject?.message}</p>

        <textarea
          placeholder="Your message"
          className="w-full px-4 py-3 border-2 h-40 placeholder:text-deepsea border-deepsea rounded-3xl  focus:outline-none focus:border-deepsea max-w-[360px]"
          {...register("message")}
        />
        <p className="text-red-500 text-sm">{errors.message?.message}</p>

        <span className="w-full max-w-[360px] my-5">
          {" "}
          <BackgroundButton
            text={contactMutation.isLoading ? "Submitting..." : "Send Message"}
            type="submit"
            disabled={contactMutation.isLoading}
            className="w-full py-2"
          />
        </span>
      </fieldset>
    </form>
  );
}
