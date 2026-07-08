import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const wishlistUser = await req.json();
    
        const productId = wishlistUser.productId || wishlistUser.id;

        const isWishListExist = await dbConnect("wishlist").findOne({ 
            email: wishlistUser.email,
            productId: productId // এই লাইনটি চেক করবে একই ইউজার একই প্রোডাক্ট বারবার দিচ্ছে কিনা
        });

        if (isWishListExist) {
            return NextResponse.json({
                message: "This item already exists in your wishlist",
                status: 400
            }, { status: 400 });
        }

        // ২. নতুন আইটেম ইনসার্ট করা
        const result = await dbConnect("wishlist").insertOne(wishlistUser);
        
        return NextResponse.json({
            message: "Wishlist inserted successfully", 
            result, 
            status: 200
        }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Wishlist API failed", 
            error: error.message, 
            status: 500
        }, { status: 500 });
    }
}



//query params er mardome data fetch most important 

//url =http://localhost:3000/api/wishlist?email=sabbirvai69k@gmail.com

//alhandulillah data fatch successfully
export async function GET(req) {
  try {
    //searchParams url teke data ta nei like `${seesion?.email}` eta niye take
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is not found" },
        { status: 400 }
      );
    }

    const collection = await dbConnect("wishlist");
//databader email sathe match kore find korbo
    const result = await collection
      .find({ userEmail: email })
      .toArray();

    return NextResponse.json(
      {
        result,
        message: "wishlist fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "wishlist fetch failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

