"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { AiFillPlusCircle } from "react-icons/ai"

export default function PostsPage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/posts")
      const data = await res.json()
      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-5 lg:px-60 bg-gray-100 text-gray-600">
      <div className="flex flex-row items-center w-full justify-between">
        <h1>Posts</h1>
        <Link href="/posts/new">
          <AiFillPlusCircle />
        </Link>
      </div>

      <ul className="w-full">
        {posts.map((post) => (
          <li key={post._id} className="my-1">
            <Link href={`/posts/${post._id}`}>
              <div className="flex flex-col  border border-gray-400 p-2 hover:bg-slate-200">
                {post.title}{" "}
                <span className="text-gray-400 text-xs">{post.content}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
