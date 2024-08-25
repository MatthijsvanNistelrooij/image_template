"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AiFillCloseCircle,
  AiFillDelete,
  AiFillEdit,
  AiFillHome,
  AiOutlineArrowLeft,
} from "react-icons/ai"

export default function PostPage({ params }) {
  const [post, setPost] = useState(null)
  const [showModel, setShowModel] = useState(false)

  const router = useRouter()

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/posts/${params.id}`)
      const data = await res.json()
      setPost(data)
    }

    fetchPost()
  }, [params.id])

  const handleShowmodel = () => {
    setShowModel(!showModel)
  }

  const handleDelete = async () => {
    const res = await fetch(`/api/posts/${params.id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      router.push("/posts")
    } else {
      console.error("Failed to delete post")
    }
  }

  if (!post) return <div>Loading...</div>

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-5 lg:px-60 bg-gray-100 text-gray-600">
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-row items-center w-full justify-between">
          <h1 className="flex flex-row justify-between">{post.title}</h1>
          <Link href="/posts">
            <AiOutlineArrowLeft />
          </Link>
        </div>
        <p className="border border-gray-400 p-5">{post.content}</p>
        <div className="flex flex-row justify-end gap-8">
          {showModel ? (
            <>
              <div
                className="flex flex-col border border-gray-400 p-20 gap-2 
              relative hover:bg-slate-200 transition-colors duration-500 animation-smooth-appear hover:border-red-500 -mt-2 -mr-2"
              >
                <button
                  onClick={handleShowmodel}
                  className="justify-start absolute top-2 right-2"
                >
                  <AiFillCloseCircle />
                </button>
                <h1>ARE YOU SURE YOU WANT TO DELETE THIS POST</h1>

                <button
                  onClick={handleDelete}
                  className="text-red-500 border border-red-100 hover:bg-red-400 hover:text-white bg-white"
                >
                  YES, DELETE
                </button>
              </div>
            </>
          ) : (
            <button onClick={handleShowmodel} className="text-red-500">
              <AiFillDelete />
            </button>
          )}

          <Link href={`/posts/${post._id}/edit`}>
            <AiFillEdit />
          </Link>
        </div>
      </div>
    </main>
  )
}
