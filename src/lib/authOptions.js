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

  //callback eta use kortechi google data pawer jonno and agola mongodb te patanor jonno

  //nexauth/Confiquration/Options/callbacks ei docs ta gele eta peye jabo

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //console.log("I am a signIn callback", user, account, profile, email, credentials);
      console.log("just ", user.name, user.email, user.image, account.provider);
      //user data save mongodb

      //check user have or not
      const isExist = await dbConnect("users").findOne({
        email: user.email,
        providerId: account?.provider,
      });
      //isExist hole sei to login hoye gese tai return true kore divo
      //return true mane holo user ke  amra login korte dise
      if (isExist) {
        return true;
      }

      //jodi na take tahole amr new user create korbo

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
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    // async session({ session, token, user }) {
    //   return session
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token
    // }
  },
};
