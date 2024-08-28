import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/generate(.*)",
  "/images(.*)",
  "/posts(.*)",
  "/purchase(.*)",
])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/api/webhooks/clerk",
    "/api/webhooks/stripe",
  ],
}
