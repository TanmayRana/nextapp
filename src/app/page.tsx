import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import SignoutButton from "@/components/SignoutButton";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("session=", session);

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <div className=" flex justify-center items-center h-screen flex-col">
        <h1 className="bg-purple-500 text-3xl font-bold p-4 rounded-md">
          Hello Bro I am your home page
        </h1>

        <div>
          <p className="my-4 text-xl font-semibold text-red-400">
            {session.user?.name}
          </p>
          <p className="my-4 text-xl font-semibold text-yellow-800">
            {session.user?.email}
          </p>
        </div>
        <SignoutButton />
      </div>
    </div>
  );
}
