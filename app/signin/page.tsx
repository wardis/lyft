import Image from "next/image";
import { redirect } from "next/navigation";

import AuthUI from "./AuthUI";

import { getSession } from "../supabase-server";

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <AuthUI />
      </div>
    </div>
  );
}
