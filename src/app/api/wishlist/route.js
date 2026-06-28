
import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const wishlistUser = await req.json();
        console.log("wishlist user", wishlistUser)
    
       
        const isWishListExist = await dbConnect("wishlist").findOne({ title: wishlistUser.title });

        if (isWishListExist) {
            return NextResponse.json({
                message: "This item already exists in your wishlist",
                status: 400
            }, { status: 400 }); // এখানে null রিটার্ন না করে একটি সঠিক Response পাঠানো ভালো
        }

    
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