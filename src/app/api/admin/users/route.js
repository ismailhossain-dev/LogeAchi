import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const result = await dbConnect("users").find().toArray();
    return NextResponse.json(
      {
        message: "Admin users retrived successfully...",
        data: result,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Admin users retrived failed...",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
