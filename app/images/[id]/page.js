"use client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AiFillHome, AiOutlineArrowLeft } from "react-icons/ai"

const ImagePage = ({ params }) => {
  // Get the dynamic route parameter
  const { id } = useParams()

  const [image, setImage] = useState("")
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/images/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch image data")
        }
        const data = await response.json()
        setImage(data.image)
        setPrompt(data.prompt)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchImage()
    }
  }, [params.id, id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!image) return <p>Image not found</p>

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-5 lg:px-60 bg-gray-100 text-gray-600">
      <div className="flex flex-row items-center w-full justify-between">
        <h1>Image Details</h1>
        <Link href={"/images"}>
          <AiOutlineArrowLeft />
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row w-full">
        <Image
          src={`data:image/jpeg;base64,${image}`}
          alt={prompt || "Image"}
          width={700}
          height={700}
        />
        <div className="h-100 flex flex-col justify-between">
          <h1></h1>
          <p className="px-4 text-slate-500">Prompt: {prompt} </p>
        </div>
      </div>
    </main>
  )
}

export default ImagePage
