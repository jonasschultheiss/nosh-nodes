import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  afterAuth(auth, req, _evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      redirectToSignIn({ returnBackUrl: req.url });
    }
    if (
      auth.userId &&
      !auth.user?.firstName &&
      !auth.user?.lastName &&
      !auth.user?.username &&
      !auth.user?.publicMetadata.yearsAtWork &&
      req.nextUrl.pathname !== "/sign-up"
    ) {
      const signUp = new URL("/sign-up", req.url);
      return NextResponse.redirect(signUp);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
