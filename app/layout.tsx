import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Image Generater",
  description: "Generate images with Stability AI",
  icons: {
    icon: "/icons/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${manrope.className}`}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
