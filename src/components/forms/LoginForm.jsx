import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUserActions } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";

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
    <form className="mt-4 max-w-80 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-3" disabled={isLoading}>
        {error && <h1>{error}</h1>}
        <input
          placeholder="Username"
          className="max-w-48 border-solid border-2 border-black"
          {...register("identifier")}
        />
        <p>{errors.identifier?.message}</p>
        <input
          placeholder="Password"
          className="max-w-48 border-solid border-2 border-black"
          {...register("password")}
          type="password"
        />
        <p>{errors.password?.message}</p>
        <button
          className="max-w-48 border-solid border-2 border-black"
          type="submit"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </fieldset>
    </form>
  );
}
