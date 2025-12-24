"use client";
import { useSession } from "next-auth/react";
import React from "react";

const UserCard = () => {
  const session = useSession();
  console.log(session);

  return (
    <div>
      <h2 className="font-bold">User client</h2>
      <div className="border rounded p-4">{JSON.stringify(session)}</div>
    </div>
  );
};

export default UserCard;
