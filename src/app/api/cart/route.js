import { NextResponse } from "next/server";

export async function POSt(req) {
    try {
    const cartUser = await req.json(); 
    console.log("add to cart api", cartUser);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Cart api filed", error:error.message, status:500
            }
        )
    }

}