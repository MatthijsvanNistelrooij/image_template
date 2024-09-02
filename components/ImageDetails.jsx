"use client"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import UserImages from "./UserImages"
import LoaderSpinner from "./LoaderSpinner"

const ImageDetails = ({ user }) => {
  const { id } = useParams()
  const [imageDetails, setImageDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLarge, setIsLarge] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/images/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch image data")
        }
        const data = await response.json()
        setImageDetails(data) // Set the entire object
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchImage()
    }
  }, [id])

  if (loading) return <LoaderSpinner />
  if (error) return <p>Error: {error}</p>
  if (!imageDetails) return <p>Image not found</p>

  const { image, prompt, clerkId } = imageDetails
  const isOwner = user.clerkId === clerkId

  const handleDelete = async () => {
    try {
      await fetch(`/api/images/${id}`, {
        method: "DELETE",
      })
      // Redirect or update UI after deletion
    } catch (error) {
      console.error("Error deleting image", error)
    }
  }

  return (
    <>
      <div className="mt-20 flex w-full justify-between max-md:justify-center">
        <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
          <Image
            src={`data:image/jpeg;base64,${image}`}
            alt={prompt || "Image"}
            width={isLarge ? 700 : 450}
            height={450}
            className="aspect-square rounded-lg hover:cursor-pointer"
            onClick={() => setIsLarge(!isLarge)}
          />

          <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
            <article className="flex flex-col gap-2 max-md:items-center">
              <h1 className="text-white-3 text-sm">created by:</h1>
              <Link href={"/profile"} className="flex flex-row gap-2">
                <Image
                  src={user?.photo}
                  width={30}
                  height={30}
                  alt="user icon"
                  className="size-[30px] rounded-full object-cover"
                />
                <h2 className="text-16 font-normal text-white-3 mt-1">
                  {user?.username}
                </h2>
              </Link>
            </article>
          </div>
        </div>

        {isOwner && (
          <div className="relative mt-2">
            <Image
              src="/icons/three-dots.svg"
              width={20}
              height={30}
              alt="Three dots icon"
              className="cursor-pointer"
              onClick={() => setIsDeleting((prev) => !prev)}
            />
            {isDeleting && (
              <div
                className="absolute -left-32 -top-2 z-10 flex w-32 cursor-pointer justify-center gap-2 rounded-md bg-black-6 py-1.5 hover:bg-black-2"
                onClick={handleDelete}
              >
                <Image
                  src="/icons/delete.svg"
                  width={16}
                  height={16}
                  alt="Delete icon"
                />
                <h2 className="text-16 font-normal text-white-1">Delete</h2>
              </div>
            )}
          </div>
        )}
      </div>
      <h1 className="text-18 font-bold text-white-1 mt-6">Prompt</h1>
      <p className="text-16 font-medium text-white-2 max-w-[455px]">{prompt}</p>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Similar Posts </h1>
        <UserImages />
      </section>
    </>
  )
}

export default ImageDetails
