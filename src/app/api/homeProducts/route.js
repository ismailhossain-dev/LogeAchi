import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        //.sort({createAt: -1})
        const result = await dbConnect("products").find().limit(8).toArray()
        return NextResponse.json ({message: "api/homeProducts get successfully", result, status: 200})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "product get failed", error: error.message
            },
            {status: 500},
        )
    }
}