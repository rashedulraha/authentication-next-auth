"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const LoginButton = () => {
  return (
    <div>
      <button className="btn" onClick={() => signIn()}>
        Login Now
      </button>
    </div>
  );
};

export default LoginButton;
