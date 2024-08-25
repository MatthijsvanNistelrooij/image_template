"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AiFillHome, AiFillPlusCircle, AiFillPlusSquare } from "react-icons/ai"

export default function ImagesPage() {
  const [images, setImages] = useState([])

  console.log("images", images)

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch("/api/images")
      const data = await res.json()

      setImages(data)
    }

    fetchImages()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-5 lg:px-60 bg-gray-100 text-gray-600">
      <div className="flex flex-row items-center w-full justify-between">
        <h1>Gallery</h1>
        <Link href={"/generate"}>
          <AiFillPlusCircle />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image._id}
            className="p-4 bg-slate-400 hover:bg-slate-300 text-transparent 
            transition-colors duration-500 animation-smooth-appear hover:text-slate-100 relative"
          >
            <div className="w-full">
              <Link href={`/images/${image._id}`}>
                <Image
                  width={600}
                  height={200}
                  src={`data:image/jpeg;base64,${Buffer.from(
                    image.image
                  ).toString("base64")}`}
                  alt={image.prompt}
                />
              </Link>
            </div>
            <p className="absolute bottom-1 left-2 p-4">{image.prompt}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
