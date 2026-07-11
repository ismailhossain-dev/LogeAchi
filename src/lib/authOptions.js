//file-1 for Login authentication 
import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
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
    console.log("I am a signIn callback", user, account, profile, email, credentials);
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

//11 minute 43second complete