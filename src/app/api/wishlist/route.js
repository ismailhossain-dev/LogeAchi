import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const wishlistUser = await req.json();

    const productId = wishlistUser.productId || wishlistUser.id;

    const exist = await dbConnect("wishlist").findOne({
      email: wishlistUser.email,
      productId: productId,
    });

    if (exist) {
      return NextResponse.json(
        {
          message: "This item already exists in your wishlist",
          isWishlisted: true,
        },
        { status: 200 }
      );
    }

    const result = await dbConnect("wishlist").insertOne({
      ...wishlistUser,
      productId,
    });

    return NextResponse.json(
      {
        message: "Wishlist inserted successfully",
        isWishlisted: true,
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Wishlist API failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

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
        { status: 400 },
      );
    }

    const result = await dbConnect("wishlist").find({ email: email }).toArray();

    return NextResponse.json(
      {
        result,
        message: "wishlist fetched successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "wishlist fetch failed",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

//wishlist delete api

export async function DELETE(req) {
  try {
    const id = await req.json();

    console.log("wishlist backend id", id);
    if (!id) {
      return NextResponse.json(
        { message: "Invalid or missing ID" },
        { status: 400 },
      );
    }

    const result = await dbConnect("wishlist").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json(
      {
        message: "Wishlist deleted successfully",
        result,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Wishlist delete failed",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
