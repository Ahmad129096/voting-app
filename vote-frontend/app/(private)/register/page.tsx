"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function Register() {
  const router = useRouter();
  const [_cookies, setCookie] = useCookies();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      rePassword: e.target[3].value,
    };

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
      <form onSubmit={handleSubmit} className="flex flex-col w-[300px]">
        <label>User Name</label>
        <input
          name="username"
          className="border-2 border-gray-500 rounded-md px-2 py-1"
        />
        <label>Email</label>
        <input
          name="email"
          className="border-2 border-gray-500 rounded-md px-2 py-1"
        />
        <label className="mt-3">Password</label>
        <input
          name="password"
          className="border-2 border-gray-500 rounded-md px-2 py-1"
        />
        <label className="mt-3">Confirm password</label>
        <input
          name="repassword"
          className="border-2 border-gray-500 rounded-md px-2 py-1"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Register
        </button>
        <Link href="/login" className="text-blue-500">
          Already have an account?
        </Link>
      </form>
    </div>
  );
}
