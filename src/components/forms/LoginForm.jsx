import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUserActions } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import BackgroundButton from "../common/buttons/BackgroundButton";

const schema = yup
  .object({
    identifier: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  })
  .required();

const apiUrl = import.meta.env.VITE_BASE_URL;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useUserActions();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    const options = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    };

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(apiUrl + "/auth/local", options);
      const json = await response.json();

      if (!response.ok) {
        return setError(json.error?.message ?? "There was an error");
      }

      setUser(json);
      navigate("/admin");
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="mt-4 max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <fieldset
        className="flex flex-col gap-3 items-center justify-center"
        disabled={isLoading}
      >
        {error && <div className="text-red-500">{error}</div>}

        <input
          placeholder="Username"
          className="w-full px-4 py-2 border border-sandstone rounded focus:outline-none focus:border-deepsea"
          {...register("identifier")}
        />
        <p className="text-red-500 text-sm">{errors.identifier?.message}</p>

        <input
          placeholder="Password"
          className="w-full px-4 py-2 border border-sandstone rounded focus:outline-none focus:border-deepsea"
          type="password"
          {...register("password")}
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <BackgroundButton
          text={isLoading ? "Logging in..." : "Login"}
          type="submit"
          disabled={isLoading}
          className="w-full py-2"
        />
      </fieldset>
    </form>
  );
}
