import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware({
  // You can configure options here, such as `publicRoutes` if needed.
  // However, `publicRoutes` is not a valid option in the newer versions of Clerk middleware.
})

export const config = {
  // Adjust this matcher as per your requirements
  matcher: [
    // Match all routes except static files and Next.js internals
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Optionally, include specific public routes if necessary
    "/",
    "/api/webhooks/clerk",
    "/api/webhooks/stripe",
  ],
}
