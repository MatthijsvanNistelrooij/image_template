"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

const ImageCard = ({ image, imgUrl }) => {
  const router = useRouter()

  const handleViews = () => {
   console.log("increase views!")
  }

  return (
    <div className="cursor-pointer" onClick={handleViews}>
      <figure className="flex flex-col gap-2">
        <Link href={`/images/${imgUrl}`}>
          <Image
            width={174}
            height={174}
            src={`data:image/jpeg;base64,${Buffer?.from(image).toString(
              "base64"
            )}`}
            alt={image.prompt}
            className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
          />
        </Link>
      </figure>
    </div>
  )
}

export default ImageCard
