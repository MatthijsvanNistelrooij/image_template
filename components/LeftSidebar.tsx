"use client"

import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import { Button } from "./ui/button"

const LeftSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useClerk()

  return (
    <section className={cn("left_sidebar h-[calc(100vh-5px)]")}>
      <nav className="flex flex-col gap-6">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center pl-8"
        >
          <Image src="/icons/logo.png" alt="logo" width={35} height={35} />
          <h1 className="text-24 font-extrabold text-white max-lg:hidden ml-2">
            AI Imager
          </h1>
        </Link>
        <Link
          href={"/"}
          className={cn(
            "flex gap-1 items-center max-lg:px-1 justify-start lg:justify-start bg-black-2 p-4 pl-6 hover:bg-black-3"
          )}
        >
          <p>Home</p>
        </Link>
        <Link
          href={"/generate"}
          className={cn(
            "flex gap-1 items-center max-lg:px-1 justify-start lg:justify-start bg-black-2 p-4 pl-6 hover:bg-black-3"
          )}
        >
          <p>Create</p>
        </Link>
        <Link
          href={"/profile"}
          className={cn(
            "flex gap-1 items-center max-lg:px-1 justify-start lg:justify-start bg-black-2 p-4 pl-6 hover:bg-black-3"
          )}
        >
          <p>Profile</p>
        </Link>
        <Link
          href={"/purchase"}
          className={cn(
            "flex gap-1 items-center max-lg:px-1 justify-start lg:justify-start bg-black-2 p-4 pl-6 hover:bg-black-3"
          )}
        >
          <p>Credits</p>
        </Link>
      </nav>
      <SignedOut>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8 pl-8">
          <Button
            asChild
            className="text-16 w-full bg-black-2 font-extrabold hover:bg-black-3"
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8 pl-8">
          <Button
            className="text-16 w-full bg-black-2 font-extrabold hover:bg-black-3"
            onClick={() => signOut(() => router.push("/"))}
          >
            Log Out
          </Button>
        </div>
      </SignedIn>
    </section>
  )
}

export default LeftSidebar
