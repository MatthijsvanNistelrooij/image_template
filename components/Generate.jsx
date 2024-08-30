"use client"
import { updateCredits } from "@/lib/actions/user.actions"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AiFillHome, AiOutlineArrowLeft, AiOutlineOpenAI } from "react-icons/ai"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import LoaderSpinner from "./LoaderSpinner"
import { useRouter } from "next/navigation"

const Generate = ({ userId, creditFee, creditBalance }) => {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const router = useRouter()

  const clerkId = userId

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, clerkId }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage(data.message)
        const updatedUser = await updateCredits(userId, creditFee - 1)

        console.log("Credits updated: ", updatedUser)
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
    <div>
      <main className="flex flex-col items-center gap-8 lg:px-6 bg-black-3 text-white-1 mt-20">
        {loading ? (
          <LoaderSpinner />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter prompt"
              required
              className="p-2 focus:outline-none border bg-black-2 text-white-2"
            />
            <Button
              type="submit"
              disabled={loading}
              className="border border-gray-200 p-3 hover:bg-black-3 bg-black-4 flex justify-center"
            >
              {loading ? "Generating..." : "Submit"}
            </Button>
          </form>
        )}
        {message && <p>{message}</p>}
      </main>
    </div>
  )
}

export default Generate
