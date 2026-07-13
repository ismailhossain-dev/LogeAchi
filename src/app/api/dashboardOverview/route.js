import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url); //client side er api teke email ta nilam
    const email = searchParams.get("email");
    //countDocuments use korle amra length ta pabo
    const totalOrders = await dbConnect("orders").countDocuments({
      email,
    });

    const pendingOrders = await dbConnect("orders").countDocuments({
    email,
        status: "pending",
    });
    //countDocuments use korle amra length ta pabo
    const totalWishlist = await dbConnect("wishlist").countDocuments({
      email,
    });
    //countDocuments use korle amra length ta pabo

    const totalCart = await dbConnect("cart").countDocuments({userEmail:email,})

    //user name 

  const user = await dbConnect("users").findOne({ email });
  const userName = user?.name;

  //5 letest order 

 const latestOrders = await dbConnect("orders").find({ email }).         sort({ price: -1 }).limit(5).toArray();               

    return NextResponse.json(
      {
        message: "overview data get succesfully",
        totalOrders,
        totalWishlist,
        totalCart,
        pendingOrders,
        userName, 
        latestOrders
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "dashboard overview data failed",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
