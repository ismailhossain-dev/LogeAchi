//file-1 for Login authentication 
import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials"

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

     const user = await loginUser(credentials)
     console.log("I am a authOptions", user);
     
     //=======is user not then the return will be null===========
      return null
    }
  })
]
}

//11 minute 43second complete