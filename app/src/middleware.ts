import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher(["/platform(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) {
    await auth.protect({ unauthenticatedUrl: new URL("/inloggen", req.url).toString() });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals en statics
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Altijd op API
    "/(api|trpc)(.*)",
  ],
};
