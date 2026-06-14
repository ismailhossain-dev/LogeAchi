//file-2 for authentication 
import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"
import { authOptions } from "../../../../lib/authOptions"
//the provider is coming from authOption



const handler = NextAuth(authOptions);
//handler ke GET and POST method e 2bar receive hobe
export {handler as GET , handler as POST}