import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST (req){
   try {
    const cheekoutData = await req.json();

   //product ekta takle er add hobe na just quantity update hobe eta ekane korbo 

    const result = await dbConnect("orders").insertOne(cheekoutData)

    return NextResponse.json({
        message: "checkout data insert successfully",
        result
    }, {status: 200})

   } catch (error) {
    console.log(error);
    return NextResponse.json({
        message:"checkout form data insert failed",
        error: error.message, 
    }, {status: 500})
   }
}


//cheek data get with query 

export async function GET(req){
    try {
        //url teke data get
        const {searchParams} = new URL (req.url);

        const email = searchParams.get("email")

    if(!email){
      return NextResponse.json({message: "Email is not found"}, {status: 400})
    }

    const result = await dbConnect("orders").findOne({email: email})
        
    return NextResponse.json({
        message: "cheekout data get successfully",
        result
    }, {status: 200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "cheekout get failed",
            error: error.message

        }, {status: 500})
    }
}