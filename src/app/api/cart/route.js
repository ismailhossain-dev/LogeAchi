import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const cartUser = await req.json();
  const isExist = await dbConnect("cart").findOne({title:cartUser.title, userEmail: cartUser.userEmail});

  if(isExist){
    return NextResponse.json({
      message: "This item already exists in your cart",
      status: 400
    }, { status: 400 });
  }

    const result = await dbConnect("cart").insertOne(cartUser);
    return NextResponse.json({
      message: "Cart inserted successfully",
      result,
      status: 200
    }, { status: 200 });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Cart API failed",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}