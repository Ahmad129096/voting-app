"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputField } from "@/components";

export default function Register() {
  const router = useRouter();
  const [_cookies, setCookie] = useCookies();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({ mode: "onChange", shouldUseNativeValidation: true });

  const onSubmit: SubmitHandler<any> = (data: any) => {
    axios
      .post("http://localhost:4001/auth/register", data)
      .then((res: any) => {
        toast.success(res.data.message);
        setCookie("token", res.data.token);
        router.push("/");
      })
      .catch(({ response }) => {
        response && toast.error(response?.data?.message);
      });
  };
  return (
    <div className="absolute translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[300px]"
      >
        <InputField
          required={true}
          name="username"
          label="Username"
          register={register}
          errors={errors?.username}
          placeholder="Enter username"
          errorMessage="Username is required"
        />
        <InputField
          isEmail
          name="email"
          label="Email"
          required={true}
          register={register}
          errors={errors?.email}
          placeholder="Enter email"
          errorMessage={
            errors?.email?.type === "validate"
              ? "Enter a valid email"
              : "Email is required"
          }
        />
        <InputField
          required={true}
          name="password"
          label="Password"
          register={register}
          errors={errors?.password}
          placeholder="Enter password"
          errorMessage="Passowrd is required"
        />
        <InputField
          required={true}
          name="rePassword"
          label="Confirm Password"
          register={register}
          errors={errors?.rePassword}
          placeholder="Confirm password"
          errorMessage="Passowrd is required"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Register
        </button>
        <Link href="/register" className="text-blue-500">
          Already have an account?
        </Link>
      </form>
    </div>
  );
}
