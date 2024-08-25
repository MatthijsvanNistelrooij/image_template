"use client"
import { useClerk } from "@clerk/clerk-react"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const { user } = useClerk()
  const [tokens, setTokens] = useState(0)

  useEffect(() => {
    const fetchTokens = async () => {
      const response = await fetch("/api/get-tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.id }),
      })

      const data = await response.json()
      setTokens(data.tokens)
    }

    fetchTokens()
  }, [user])

  return <div>You have {tokens} tokens</div>
}
