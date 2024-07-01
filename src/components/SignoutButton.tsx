"use client";

import { signOut } from "next-auth/react";

const SignoutButton = () => {
  return (
    <div>
      <button
        className="bg-orange-200 rounded-md p-2"
        onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
      >
        Sign out
      </button>
    </div>
  );
};

export default SignoutButton;
