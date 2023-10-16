import Image from "next/image";
import { redirect } from "next/navigation";

import AuthUI from "./AuthUI";

import { getSession } from "../supabase-server";

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </div>
        <AuthUI />
      </div>
    </div>
  );
}
