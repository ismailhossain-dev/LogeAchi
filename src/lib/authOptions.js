import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "./dbConnect";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {},
      async authorize(credentials, req) {
        const user = await loginUser(credentials);

        if (user) {
          return user;
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],



  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      console.log("just ", user.name, user.email, user.image, account.provider);

      //check user have or not
      const isExist = await dbConnect("users").findOne({
        email: user.email,
        providerId: account?.provider,
      });
      if (isExist) {
        return true;
      }

      const newUser = {
        providerId: account?.provider,
        name: user.name,
        email: user.email,
        image: user.image,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "active",
        role: "user",
      };

      const result = await dbConnect("users").insertOne(newUser);
      return result.acknowledged;

      return true;
    },
    
  },
};
