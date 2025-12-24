"use server";

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

const postUser = async (payload) => {
  console.log(payload);

  //0  validation user
  if (!payload.email && !payload.password) {
    return {
      status: 400,
      message: "Email and password required",
    };
  }

  //1  check user exist or not
  const isExist = await dbConnect("users").findOne({ email: payload.email });

  if (isExist) {
    return {
      success: false,
      message: "User already Exist",
    };
  }

  //2 create new user

  //   hash password
  const hashPassword = await bcrypt.hash(payload.password, 10);
  console.log(hashPassword);

  const newUser = {
    ...payload,
    createAt: new Date().toISOString(),
    role: "user",
    password: hashPassword,
  };

  console.log(newUser);

  //3 send user to data base

  const result = await dbConnect("users").insertOne(newUser);
  if (result.acknowledged) {
    return {
      status: 200,
      message: `User created with ${result.insertedId}`,
    };
  }
};

export default postUser;
