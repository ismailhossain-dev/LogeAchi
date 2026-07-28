import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

//query params use
//http://localhost:3000/api/user?email=lywyzuxaji@mailinator.com
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    console.log("backend profile email", email);
    if (!email) {
      return NextResponse.json(
        { message: "Email is not found" },
        { status: 400 },
      );
    }
    const result = await dbConnect("users").findOne({ email: email });

    return NextResponse.json(
      {
        message: "User get successfully",
        result,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "user get failed",
      status: 404,
    });
  }
}

//profile updated api

export async function PATCH(req) {
  try {
    //take email from query ?email={}
    const { searchParams } = new URL(req.url);

    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        {
          message: "Email is required",
        },
        { status: 400 },
      );
    }

    //take data from body

    const body = await req.json();
    // console.log("backend profile data", body);

    //take some information so it change profile
    const { name, phone, address, division } = body;

    //========now main work & update ============
    const result = await dbConnect("users").updateOne(
      //profile update between email
      { email },
      //now give information just these update data
      {
        $set: {
          name,
          phone,
          address,
          division,
        },
      },
    );

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        modifiedCount: result.modifiedCount,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Profile Updated failed",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
