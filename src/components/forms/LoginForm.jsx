import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUserActions } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import BackgroundButton from "../common/buttons/BackgroundButton.jsx";
import { useMutation } from "@tanstack/react-query";
import login from "../../api/auth/login";

const schema = yup
  .object({
    identifier: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  })
  .required();

export default function LoginForm() {
  const { setUser } = useUserActions();

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (data) => {
      setUser(data);
      navigate("/admin");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    loginMutation.mutate(data);
  }

  return (
    <form
      className="mt-4  mx-auto   w-[95%] tablet:w-96 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-header text-3xl text-deepsea font-bold mx-auto w-48 my-10">
        Admin login
      </h1>
      <fieldset
        className="flex flex-col gap-3 items-center justify-center w-full font-button text-xl"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isError && (
          <div className="text-red-500">{loginMutation.error.message}</div>
        )}

        <input
          placeholder="Email address"
          className="w-full px-4 py-3 border-2 placeholder:text-deepsea border-deepsea rounded-3xl focus:outline-none focus:border-deepsea max-w-[360px]"
          {...register("identifier")}
        />
        <p className="text-red-500 text-sm">{errors.identifier?.message}</p>

        <input
          placeholder="Password"
          className="w-full px-4 py-3 border-2 placeholder:text-deepsea border-deepsea rounded-3xl  focus:outline-none focus:border-deepsea max-w-[360px]"
          type="password"
          {...register("password")}
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
        <span className="max-w-[360px] w-full">
          <BackgroundButton
            text={loginMutation.isPending ? "Logging in..." : "Login"}
            type="submit"
            disabled={loginMutation.isPending}
          />
        </span>
      </fieldset>
    </form>
  );
}
