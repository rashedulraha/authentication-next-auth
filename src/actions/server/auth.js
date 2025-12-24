"use server";

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

const postUser = async (payload) => {
  console.log(payload);

  //1  check user exist or not
  const isExist = await dbConnect("users").findOne({ email: payload });

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
};

export default postUser;
