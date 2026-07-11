//file-1 for Login authentication 
import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "./dbConnect";
export const authOptions = {
  // Configure one or more authentication providers
  //first provider hobe credentials
 providers: [
  CredentialsProvider({
    name: 'Credentials',

    credentials: {
      // username: { label: "Username", type: "text", placeholder: "jsmith" },
      // password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {

      //match korai tese login user e
     const user = await loginUser(credentials)
    //  console.log("I am a authOptions", user);

     if(user){
      return user;
     }
     
     //=======is user not then the return will be null===========
      return null
    }
  }),

  //google provider : nextauth/providers/google docs
   GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
],

//callback eta use kortechi google data pawer jonno and agola mongodb te patanor jonno 

//nexauth/Confiquration/Options/callbacks ei docs ta gele eta peye jabo

callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    //console.log("I am a signIn callback", user, account, profile, email, credentials);
    console.log("just ", user.name, user.email, user.image, account.provider);
  //user data save mongodb 

  //check user have or not
  const isExist = await dbConnect("users").findOne({ email: user.email, providerId: account?.provider });
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
      return result.acknowledged

    return true
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
}
}

