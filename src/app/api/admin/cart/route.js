import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const result = await dbConnect("cart").find().toArray();
    return NextResponse.json(
      {
        message: "Admin cart retrived successfully...",
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
        message: "Admin cart retrived failed...",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
