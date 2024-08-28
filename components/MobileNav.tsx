"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MobileNav = () => {
  const pathname = usePathname()

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="border-none bg-black-1 text-white-1 p-0"
        >
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-1 pb-10 p-5"
          >
            <Image src="/icons/logo.png" alt="logo" width={23} height={27} />
            <h1 className="text-24 font-extrabold  text-white-1 ml-2">
              AI-mager
            </h1>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 text-white-1">
                <Link
                  href={"/"}
                  className={cn(
                    "flex gap-1 items-center max-lg:px-1 justify-start lg:justify-start bg-black-2 p-4 hover:bg-black-3"
                  )}
                >
                  <p className="ml-5">Home</p>
                </Link>
                <Link
                  href={"/generate"}
                  className={cn(
                    "flex gap-1 items-center max-lg:px-1 justify-start lg:justify-start bg-black-2 p-4 hover:bg-black-3"
                  )}
                >
                  <p className="ml-5">Create</p>
                </Link>
                <Link
                  href={"/profile"}
                  className={cn(
                    "flex gap-1 items-center max-lg:px-1 justify-start lg:justify-start bg-black-2 p-4 hover:bg-black-3"
                  )}
                >
                  <p className="ml-5">Profile</p>
                </Link>
                <Link
                  href={"/purchase"}
                  className={cn(
                    "flex gap-1 items-center max-lg:px-1 justify-start lg:justify-start bg-black-2 p-4 hover:bg-black-3"
                  )}
                >
                  <p className="ml-5">Credits</p>
                </Link>
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
