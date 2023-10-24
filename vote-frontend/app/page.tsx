"use client";

import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();
  const [_cookies, _setCookie, removeCookie] = useCookies();
  return (
    <div>
      voting app
      <button
        onClick={() => {
          removeCookie("token");
          route.push("/login");
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
