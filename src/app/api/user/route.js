import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const userData = await req.json();
        console.log("backend user get,,,,,,,,,,,,,,, ")


        return NextResponse.json({
            message: "User get successfully",
            status: 2000
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"user get failed",
            status: 404
        })
    }
}