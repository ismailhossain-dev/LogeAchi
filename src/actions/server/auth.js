"use server";
//Login and Register work 
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";


//register post function
export const postUser = async (payload) => {
  const { name, email, password, image } = payload;

  try {
    const collection = dbConnect("users");

    //check user
    const isExist = await collection.findOne({ email });

    if (isExist) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const newUser = {
      providerId: "credentials",
      name,
      email,
      image,
      password: await bcrypt.hash(password, 14),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "active",
      role: "user",
    };

    const result = await collection.insertOne(newUser);

    return {
      success: true,
      insertedId: result.insertedId.toString(),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "User creation failed",
    };
  }
};

//Login Function 
//Login function 


export const loginUser = async (payload)=> {
    const {email , password} = payload 
    if(!email, !password) return null

    //check user have or not 
    const user = await dbConnect("users").findOne({email}
    );
    if(!user) return null 

    //loginForm sathe mongodb hash password match ache kina dektese
    const isMatched = await bcrypt.compare(password, user.password)
    if(isMatched){
        return user
    }else{
        return null
    }
}