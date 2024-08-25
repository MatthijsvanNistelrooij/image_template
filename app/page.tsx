import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 p-10 lg:px-60">
      <Link
        href={"/posts"}
        className="border border-gray-200 p-3 text-center hover:bg-gray-100 w-full"
      >
        POSTS
      </Link>
      <Link
        href={"/images"}
        className="border border-gray-200 p-3 text-center hover:bg-gray-100 w-full"
      >
        A.I
      </Link>
      <Link
        href={"/dashboard"}
        className="border border-gray-200 p-3 text-center hover:bg-gray-100 w-full"
      >
        Dashboard
      </Link>
      <Link
        href={"/purchase"}
        className="border border-gray-200 p-3 text-center hover:bg-gray-100 w-full"
      >
        Purchase Tokens
      </Link>
    </main>
  )
}
