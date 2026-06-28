import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const products = await dbConnect("products")
      .find()
      .toArray();

    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: "Products not found" },
        { status: 404 }
      );
    }

    return NextResponse.json( {
      message: "product get successfully",
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
      }
    );
  }
}