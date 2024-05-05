import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BackgroundButton from "../common/buttons/BackgroundButton";
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
      // Handle success, maybe clear form or show a success message
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
    reset(); // Optionally reset the form after submit
  }

  return (
    <form className="mt-4 max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <fieldset
        className="flex flex-col gap-3 items-center justify-center"
        disabled={contactMutation.isLoading}
      >
        {contactMutation.isError && (
          <div className="text-red-500">{contactMutation.error.message}</div>
        )}

        <input
          placeholder="Name"
          className="w-full px-4 py-2 border border-sandstone rounded focus:outline-none focus:border-deepsea"
          {...register("name")}
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>

        <input
          placeholder="Email"
          className="w-full px-4 py-2 border border-sandstone rounded focus:outline-none focus:border-deepsea"
          {...register("email")}
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input
          placeholder="Subject"
          className="w-full px-4 py-2 border border-sandstone rounded focus:outline-none focus:border-deepsea"
          {...register("subject")}
        />
        <p className="text-red-500 text-sm">{errors.subject?.message}</p>

        <textarea
          placeholder="Your message"
          className="w-full px-4 py-2 border border-sandstone rounded focus:outline-none focus:border-deepsea"
          {...register("message")}
        />
        <p className="text-red-500 text-sm">{errors.message?.message}</p>

        <BackgroundButton
          text={contactMutation.isLoading ? "Submitting..." : "Send Message"}
          type="submit"
          disabled={contactMutation.isLoading}
          className="w-full py-2"
        />
      </fieldset>
    </form>
  );
}
