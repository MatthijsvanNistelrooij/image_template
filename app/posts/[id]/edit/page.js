"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AiFillHome, AiOutlineArrowLeft, AiOutlineCheck } from "react-icons/ai"

export default function EditPostPage({ params }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const router = useRouter()

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/posts/${params.id}`)
      const data = await res.json()
      setTitle(data.title)
      setContent(data.content)
    }

    fetchPost()
  }, [params.id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/posts/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })

    if (res.ok) {
      router.push(`/posts/${params.id}`)
    } else {
      console.error("Failed to update post")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-5 lg:px-60 bg-gray-100 text-gray-600">
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-row items-center justify-between">
          <h1>Edit Post</h1>
          <Link href={`/posts/${params.id}`}>
            <AiOutlineArrowLeft />
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col gap-2">
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
              className="text-gray-600 border border-gray-200 rounded-md p-2 focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 flex justify-end text-green-500 border border-gray-200 hover:bg-gray-200"
            >
              <AiOutlineCheck />
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
