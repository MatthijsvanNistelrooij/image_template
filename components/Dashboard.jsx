"use client"
import React, { useEffect, useState } from "react"

const Dashboard = ({ user }) => {
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

export default Dashboard
