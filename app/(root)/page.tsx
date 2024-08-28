"use client"
import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import ImageCard from "@/components/ImageCard"
import { useEffect, useState } from "react"
import LoaderSpinner from "@/components/LoaderSpinner"

export default function Home() {
  const [images, setImages] = useState<any[]>([]) // Adjust type as needed
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images")
        if (!response.ok) {
          throw new Error("Failed to fetch images")
        }
        const data = await response.json()
        setImages(data)
      } catch (error) {
        // Type assertion
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (images.length === 0) return <LoaderSpinner />

  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className="flex flex-col gap-5">
        <div className="podcast_grid">
          {images
            .slice()
            .reverse()
            .map(({ _id, image }) => (
              <ImageCard imgUrl={_id} key={_id} image={image} />
            ))}
        </div>
      </section>
    </div>
  )
}
