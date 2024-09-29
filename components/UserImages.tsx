"use client"

import React, { useEffect, useState } from "react"
import ImageCard from "./ImageCard"
import LoaderSpinner from "./LoaderSpinner"

const UserImages = () => {
  const [images, setImages] = useState<any[]>([])
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
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (loading)
    return (
      <div className="-mt-40">
        <LoaderSpinner />
      </div>
    )
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images
          .slice()
          .reverse()
          .map(({ _id, image }) => (
            <ImageCard imgUrl={_id} key={_id} image={image} />
          ))}
      </div>
    </div>
  )
}

export default UserImages
