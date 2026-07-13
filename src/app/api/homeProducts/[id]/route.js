//this api for single details page
import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  // console.log("single product id");
  try {
    const product = await dbConnect("products").findOne({_id: new ObjectId(id)});

    if (!product) {
      return NextResponse.json(
        { message: "single product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json( {message: "details api get successfully", result: product, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "single data err", error: error.message },
      { status: 500 },
    );
  }
}
