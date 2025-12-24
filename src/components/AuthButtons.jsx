"use client";

import React from "react";
import LoginButton from "./LoginButton";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const AuthButtons = () => {
  const session = useSession();

  const handleSignout = () => {
    signOut();
  };

  return (
    <div>
      {session.status === "authenticated" ? (
        <button className="btn" onClick={handleSignout}>
          Logout
        </button>
      ) : (
        <>
          <div className="flex items-center justify-center gap-5">
            <LoginButton />
            <Link href={"/register"} className="btn">
              Register
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
