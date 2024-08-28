"use server"
import ImageDetails from "@/components/ImageDetails"
import { getUserById } from "@/lib/actions/user.actions"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const ImagePage = async () => {
  const { userId } = auth()

  if (!userId) redirect("/sign-in")

  const user = await getUserById(userId)

  return (
    <>
      <ImageDetails user={user} />
    </>
  )
}

export default ImagePage
