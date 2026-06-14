"use server";

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const postUser = async (payload) => {
  const { name, email, password } = payload;

  try {
    const collection = dbConnect("users");

    //check user
    const isExist = await collection.findOne({ email });

    if (isExist) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const newUser = {
      providerId: "credentials",
      name,
      email,
      password: await bcrypt.hash(password, 14),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "active",
      role: "user",
    };

    const result = await collection.insertOne(newUser);

    return {
      success: true,
      insertedId: result.insertedId.toString(),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "User creation failed",
    };
  }
};