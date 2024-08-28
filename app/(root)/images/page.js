import Link from "next/link"

import { AiFillHome, AiFillPlusCircle, AiFillPlusSquare } from "react-icons/ai"
import { SignedIn } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Images from "../../../components/ImageCard"
import { getUserById } from "@/lib/actions/user.actions"

const ImagesPage = async () => {
  const { userId } = auth()

  if (!userId) redirect("/sign-in")

  const user = await getUserById(userId)
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-5 lg:px-60 bg-gray-100 text-gray-600">
      <div className="flex flex-row items-center w-full justify-between">
        <h1>Gallery</h1>
        <Link href={"/generate"}>
          <AiFillPlusCircle />
        </Link>
      </div>

    </main>
  )
}

export default ImagesPage
