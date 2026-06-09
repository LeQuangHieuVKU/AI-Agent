import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(async function proxy() {}, {
  // Proxy still runs on all routes. Add any public paths here so they
  // won't be protected/redirected to the auth login endpoint.
  publicPaths: [
    "/", // root
    "/dashboard",
    "/dashboard/*",
    "/workflow",
    "/workflow/*",
    "/api/auth",
    "/api/auth/*",
  ], // e.g. ["/api/public", "/blog", "/about"]
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
