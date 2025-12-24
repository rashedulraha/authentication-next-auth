import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

//  create private route
const privateRoute = ["/private", "/dashboard", "/secret"];

// This function can be marked `async` if using `await` inside
export async function proxy(req) {
  // return NextResponse.redirect(new URL("/home", req.url));

  const token = await getToken({ req });
  const reqPath = req.nextUrl.pathname;
  const isAuthenticated = Boolean(token);

  const isUser = token?.role === "user";
  const isPrivateRoute = privateRoute.some((route) =>
    reqPath.startsWith(route)
  );

  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  console.log(token);
  console.log(isUser);

  console.log(isAuthenticated);
  console.log(reqPath);
  console.log(isPrivateRoute);

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: "/private/:path*",
};
