import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
//amra ekbar proxy video ta dekbo in Sha Allah
//ekane jei route gola divo agola private route hoye jabe
const privateRoute = ["/user", "/add-bike", "/checkout"];

export async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuthenticated = !!token;
  const reqPath = req.nextUrl.pathname;

  const isPrivateReq = privateRoute.some((route) =>
    reqPath.startsWith(route)
  );

  if (!isAuthenticated && isPrivateReq) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${reqPath}`, req.url)
    );
  }

  return NextResponse.next();
}