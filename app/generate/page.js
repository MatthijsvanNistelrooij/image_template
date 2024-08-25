"use client"
import Link from "next/link"
import { useState } from "react"
import { AiFillHome, AiOutlineArrowLeft, AiOutlineOpenAI } from "react-icons/ai"

export default function GenerateImagePage() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage(data.message)
      } else {
        setMessage(data.error)
      }
    } catch (error) {
      setMessage("An error occurred while generating the image.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-5 lg:px-60 bg-gray-100 text-gray-600">
      <div className="flex flex-row items-center w-full justify-between">
        <h1>Generate Image</h1>{" "}
        <Link href={"/images"}>
          <AiOutlineArrowLeft />
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt"
          required
          className="p-2 focus:outline-none border"
        />
        <button
          type="submit"
          disabled={loading}
          className="border border-gray-200 p-3 hover:bg-gray-200 flex justify-end"
        >
          {loading ? "Generating..." : <AiOutlineOpenAI />}
        </button>
      </form>
      {message && <p>{message}</p>}
    </main>
  )
}
