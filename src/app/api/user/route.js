import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

//query params use
//http://localhost:3000/api/user?email=lywyzuxaji@mailinator.com
export async function GET(req) {
    try {
    const {searchParams} = new URL(req.url);
  const email = searchParams.get("email");

    console.log("backend profile email", email)
     if(!email){
      return NextResponse.json({message: "Email is not found"}, {status: 400})
    }
    const result = await dbConnect("users").findOne({email:email})


    return NextResponse.json({
            message: "User get successfully",
            result
        }, {status: 200})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"user get failed",
            status: 404
        })
    }
}