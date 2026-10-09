import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await dbConnect("orders").countDocuments();
    const wishlist = await dbConnect("wishlist").countDocuments();
    const cart = await dbConnect("cart").countDocuments();
    const users = await dbConnect("users").countDocuments();

    return NextResponse.json(
      {
        message: "Admin dashboard overview successfully...",
        data: {
          orders,
          wishlist,
          cart,
          users,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Admin dashboard overview failed...",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
