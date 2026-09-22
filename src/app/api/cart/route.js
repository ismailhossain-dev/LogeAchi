import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
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


//query params get api
//http://localhost:3000/api/user?email=lywyzuxaji@mailinator.com
export async function GET(req) {
  try{
    const {searchParams} = new URL(req.url);
    // searchParams er mardome data ta nei like `${seesion?.email}` eta niye 
    const email = searchParams.get("email");
    if(!email){
      return NextResponse.json({message: "Email is not found"}, {status: 400})
    }
    const cartItems = await dbConnect("cart").find({userEmail: email}).toArray();
    return NextResponse.json({message: "Cart items fetched successfully", result: cartItems}, {status: 200})
  }catch(error){
    console.log(error);
    return NextResponse.json({message: "Cart API failed", error: error.message}, {status: 500})
  }
}


//cart delete api 

export async function DELETE(req) {
  try {
 
    const { id } = await req.json(); 


    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid or missing ID" }, { status: 400 });
    }

    const result = await dbConnect("cart").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Cart item deleted successfully", result }, { status: 200 });
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "API failed", error: error.message }, { status: 500 });
  }
}

