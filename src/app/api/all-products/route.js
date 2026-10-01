import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const result = await dbConnect("products").find().toArray();
    return NextResponse.json({
      message: "api/all-collection get successfully",
      result,
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "All products fetch failed",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
