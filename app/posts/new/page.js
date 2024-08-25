"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AiFillHome, AiOutlineArrowLeft, AiOutlineCheck } from "react-icons/ai"
import Link from "next/link"

export default function NewPostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })

    if (res.ok) {
      router.push("/posts")
    } else {
      console.error("Failed to create post")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-5 lg:px-60 bg-gray-100 text-gray-600">
      <div className="flex flex-row items-center w-full justify-between">
        <h1>Create New Post</h1>
        <Link href={"/posts"}>
          <AiOutlineArrowLeft />
        </Link>
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="text-gray-600 border border-gray-200 rounded-md p-2 focus:outline-none"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="text-gray-600 border-none rounded-md p-2 focus:outline-none"
          />
          <button
            type="submit"
            className="p-2 flex justify-end text-green-500 border border-gray-200 hover:bg-gray-200"
          >
            <AiOutlineCheck />
          </button>
        </form>
      </div>
    </main>
  )
}
